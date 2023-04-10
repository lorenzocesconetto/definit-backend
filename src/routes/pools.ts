import { Type } from "@sinclair/typebox";
import { prisma } from "../providers/prisma";
import { getBlockchain } from "../utils/getBlockchain";
import { getPoolEarnings30d } from "../utils/getPoolEarnings30d";
import { getPoolTvlVariation30d } from "../utils/getPoolTvlVariation30d";
import { getPoolVolume30d } from "../utils/getPoolVolume30d";
import { getPoolAPY30d } from "../utils/getPoolAPY30d";
import { FastifyTypebox } from "./types";
import { getCurrentTimestampInSeconds } from "../utils/getCurrentTimestamp";
import { web3Service, defiLlamaService, subgraphManage } from "../services";
import { Prisma } from "@prisma/client";
import moment from "moment";

const schema = {
    params: Type.Object({
        id: Type.Integer(),
    }),
};

async function routes(fastify: FastifyTypebox): Promise<void> {
    fastify.get("/pools/best-risk-reward", async () => {
        const pools = await prisma.pool.findMany({
            where: {
                name: {
                    in: [
                        "Uniswap BUSD-USDC Market Making 0.01%",
                        "Uniswap DAI-USDT Market Making 0.05%",
                    ],
                },
            },
            orderBy: [{ id: "desc" }],
            select: {
                name: true,
                apy30d: true,
                tvlUSD: true,
                overallRiskRating: true,
                protocol: { select: { name: true, imageUrl: true } },
                blockchain: { select: { name: true, imageUrl: true } },
                token0: { select: { symbol: true } },
                token1: { select: { symbol: true } },
            },
        });
        return pools;
    });

    fastify.get("/pools/:id", { schema }, async req => {
        const { id } = req.params;
        const pool = await prisma.pool.findUniqueOrThrow({
            where: { id },
            include: {
                blockchain: true,
                protocol: true,
                token0: true,
                token1: true,
            },
        });
        return { ...pool, llama: JSON.parse(pool.llama as string) };
    });

    fastify.get("/pools/:id/refresh", { schema }, async req => {
        const { id } = req.params;
        const pool = await prisma.pool.findUniqueOrThrow({
            where: { id },
            include: {
                blockchain: true,
                protocol: true,
                token0: true,
                token1: true,
            },
        });
        // If pool was updated less than 5 minutes ago, just return what's already in the database
        if (moment(pool.updatedAt).add(5, "minutes") >= moment(new Date())) {
            return { ...pool, llama: JSON.parse(pool.llama as string) };
        }
        const blockchain = getBlockchain(pool.blockchainId);
        const [tvl, subgraph, llama] = await Promise.all([
            web3Service.getPoolTVL({
                blockchainId: pool.blockchainId,
                poolAddress: pool.address,
                token0Address: pool.token0Address,
                token1Address: pool.token1Address,
            }),
            subgraphManage.getPoolSubgraph({
                address: pool.address,
                endTime: getCurrentTimestampInSeconds(),
                first: 30,
                skip: 0,
                subgraphUrl: blockchain.subgraphUrl,
            }),
            defiLlamaService.getPoolDefiLlama(pool.defiLlamaId),
        ]);
        const updatedPoolAttrs: Prisma.PoolUpdateInput = {
            apy30d: getPoolAPY30d(llama),
            tvlUSD: tvl.tvlUSD,
            tvlVariation30d: getPoolTvlVariation30d(tvl.tvlUSD, llama),
            earnings30d: getPoolEarnings30d(subgraph),
            volume30d: getPoolVolume30d(subgraph),
            token0Balance: tvl.token0Balance,
            token1Balance: tvl.token1Balance,
            llama: JSON.stringify(llama),
        };
        await prisma.pool.update({
            data: updatedPoolAttrs,
            where: { id: pool.id },
        });
        return { ...pool, ...updatedPoolAttrs, llama };
    });

    if (process.env.ENV === "dev")
        // This endpoint is for development puposes only
        fastify.get("/pools/:id/llama", { schema }, async req => {
            const { id } = req.params;
            const pool = await prisma.pool.findUniqueOrThrow({
                where: { id },
                include: {
                    blockchain: true,
                    protocol: true,
                    token0: true,
                    token1: true,
                },
            });
            const llama = await defiLlamaService.getPoolDefiLlama(
                pool.defiLlamaId
            );
            const apy30d = getPoolAPY30d(llama);
            const currTvl = await web3Service.getPoolTVL({
                blockchainId: pool.blockchainId,
                poolAddress: pool.address,
                token0Address: pool.token0Address,
                token1Address: pool.token1Address,
            });
            const tvlVariation30d = getPoolTvlVariation30d(
                currTvl.tvlUSD,
                llama
            );
            return { apy30d, tvlVariation30d, data: llama };
        });
}

export { routes };
