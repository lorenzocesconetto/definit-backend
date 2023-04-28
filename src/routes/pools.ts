import { Type } from "@sinclair/typebox";
import { prisma } from "../providers/prisma";
import { getBlockchain } from "../utils/getBlockchain";
import { getPoolTvlVariation30d } from "../utils/getPoolTvlVariation30d";
import { getPoolAPY30d } from "../utils/getPoolAPY30d";
import { FastifyTypebox } from "./types";
import { web3Service, defiLlamaService } from "../services";
import { Prisma } from "@prisma/client";
import moment from "moment";
import { processEconomicsState } from "../utils/processEconomicsState";
import { composedService } from "../services/composed";

const schema = {
    params: Type.Object({
        id: Type.Integer(),
    }),
};

async function routes(fastify: FastifyTypebox): Promise<void> {
    fastify.get("/pools/best-risk-reward", async () => {
        const pools = await prisma.pool.findMany({
            where: {
                OR: [
                    {
                        blockchainId: { equals: 1 },
                        address: {
                            equals: "0x5e35c4eba72470ee1177dcb14dddf4d9e6d915f4",
                        },
                    },
                    {
                        blockchainId: { equals: 42161 },
                        address: {
                            equals: "0x6387b0d5853184645cc9a77d6db133355d2eb4e4",
                        },
                    },
                ],
            },
            orderBy: [{ id: "desc" }],
            select: {
                id: true,
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
            select: {
                blockchain: true,
                protocol: true,
                token0: true,
                token1: true,
                address: true,
                apy30d: true,
                assetStrengthRating: true,
                blockchainId: true,
                description: true,
                earnings30d: true,
                economicsRiskRating: true,
                fee: true,
                fundamentalsRiskRating: true,
                impermanentLossDescription: true,
                id: true,
                impermanentLossRating: true,
                llama: true,
                name: true,
                tvlUSD: true,
                tvlVariation30d: true,
                yieldOutlookDescription: true,
                yieldOutlookRating: true,
                volume30d: true,
                overallRiskRating: true,
            },
        });
        return { ...pool, llama: JSON.parse(pool.llama as string) };
    });

    fastify.get("/pools/:id/refresh", { schema }, async req => {
        const { id } = req.params;
        const pool = await prisma.pool.findUniqueOrThrow({
            where: { id },
            select: {
                blockchain: true,
                protocol: true,
                token0: true,
                token1: true,
                id: true,
                name: true,
                address: true,
                description: true,
                blockchainId: true,
                fee: true,
                tvlUSD: true,
                apy30d: true,
                earnings30d: true,
                volume30d: true,
                assetStrengthRating: true,
                economicsRiskRating: true,
                fundamentalsRiskRating: true,
                impermanentLossDescription: true,
                impermanentLossRating: true,
                llama: true,
                tvlVariation30d: true,
                yieldOutlookDescription: true,
                yieldOutlookRating: true,
                overallRiskRating: true,
                updatedAt: true,
                token0Address: true,
                token1Address: true,
                defiLlamaId: true,
            },
        });
        // If pool was updated less than 5 minutes ago, just return what's already in the database
        if (moment(pool.updatedAt).add(5, "minutes") >= moment(new Date())) {
            return { ...pool, llama: JSON.parse(pool.llama as string) };
        }
        const blockchain = getBlockchain(pool.blockchainId);
        const [tvl, subgraph, llama] =
            await composedService.getPoolStateEconomics(
                pool,
                blockchain.subgraphUrl
            );
        const updatedPoolAttrs: Prisma.PoolUpdateInput = processEconomicsState(
            tvl,
            subgraph,
            llama
        );
        await prisma.pool.update({
            data: updatedPoolAttrs,
            where: { id: pool.id },
        });
        return { ...pool, ...updatedPoolAttrs, llama };
    });

    if (process.env.ENV === "dev") {
        // These endpoints are for development puposes only
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
}

export { routes };
