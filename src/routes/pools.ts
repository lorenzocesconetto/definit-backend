import { Type } from "@sinclair/typebox";
import { prisma } from "../providers/prisma";
import { getPoolSubgraph, getPoolTVL, getPoolTVLById } from "../services";
import { getPoolDefiLlama } from "../services/getPoolDefiLlama";
import { getBlockchain } from "../utils/getBlockchain";
import { getPoolEarnings30d } from "../utils/getPoolEarnings30d";
import { getPoolTvlVariation30d } from "../utils/getPoolTvlVariation30d";
import { getPoolVolume30d } from "../utils/getPoolVolume30d";
import { getPoolAPY30d } from "../utils/getPoolAPY30d";
import { FastifyTypebox } from "./types";
import { getCurrentTimestampInSeconds } from "../utils/getCurrentTimestamp";

const schema = {
    params: Type.Object({
        id: Type.Integer(),
    }),
};

async function routes(fastify: FastifyTypebox): Promise<void> {
    fastify.get("/pools/best-risk-reward", async () => {
        const pools = await prisma.pool.findMany({
            where: { id: { in: [1, 2, 3] } },
            orderBy: [{ id: "asc" }],
            include: {
                blockchain: true,
                protocol: true,
                token0: true,
                token1: true,
            },
        });
        const TVLs = await Promise.all([
            getPoolTVLById(1),
            getPoolTVLById(2),
            getPoolTVLById(3),
        ]);
        const llamas = await Promise.all([
            getPoolDefiLlama(pools[0].defiLlamaId),
            getPoolDefiLlama(pools[1].defiLlamaId),
            getPoolDefiLlama(pools[2].defiLlamaId),
        ]);
        const enrichedPools = pools.map((pool, index) => ({
            ...pool,
            ...TVLs[index],
            apy30d: getPoolAPY30d(llamas[index]),
        }));
        return enrichedPools;
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
        const blockchain = getBlockchain(pool.blockchainId);
        const [tvl, subgraph, llama] = await Promise.all([
            getPoolTVL({
                blockchainId: pool.blockchainId,
                poolAddress: pool.address,
                token0Address: pool.token0Address,
                token1Address: pool.token1Address,
            }),
            getPoolSubgraph({
                address: pool.address,
                endTime: getCurrentTimestampInSeconds(),
                first: 30,
                skip: 0,
                subgraphUrl: blockchain.subgraphUrl,
            }),
            getPoolDefiLlama(pool.defiLlamaId),
        ]);
        const apy30d = getPoolAPY30d(llama);
        const tvlVariation30d = getPoolTvlVariation30d(tvl.tvlUSD, llama);
        const earnings30d = getPoolEarnings30d(subgraph);
        const volume30d = getPoolVolume30d(subgraph);
        return {
            ...pool,
            ...tvl,
            apy30d,
            tvlVariation30d,
            earnings30d,
            volume30d,
            llama,
        };
    });

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
        const llama = await getPoolDefiLlama(pool.defiLlamaId);
        const apy30d = getPoolAPY30d(llama);
        const currTvl = await getPoolTVL({
            blockchainId: pool.blockchainId,
            poolAddress: pool.address,
            token0Address: pool.token0Address,
            token1Address: pool.token1Address,
        });
        const tvlVariation30d = getPoolTvlVariation30d(currTvl.tvlUSD, llama);
        return { apy30d, tvlVariation30d, data: llama };
    });
}

export { routes };
