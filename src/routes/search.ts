import { Type } from "@sinclair/typebox";
import { FastifyTypebox } from "./types";
import { prisma } from "../providers/prisma";
import { Prisma } from "@prisma/client";

interface IFilter extends Prisma.PoolWhereInput {
    apy30d: { gte?: number; lte?: number };
    tvlUSD: { gte?: number; lte?: number };
    overallRiskRating: { in?: string[] };
    blockchainId: { in?: number[] };
}

const schema = {
    querystring: Type.Object({
        minAPY: Type.Optional(Type.Integer({ minimum: 0 })),
        maxAPY: Type.Optional(Type.Integer({ minimum: 0 })),
        minTvlUSD: Type.Optional(Type.Integer({ minimum: 0 })),
        maxTvlUSD: Type.Optional(Type.Integer({ minimum: 0 })),
        risks: Type.Optional(Type.String()),
        tokenIds: Type.Optional(Type.String()),
        blockchainIds: Type.Optional(Type.String()),
    }),
};

async function routes(fastify: FastifyTypebox) {
    fastify.get("/pools", { schema }, async req => {
        const {
            minAPY,
            maxAPY,
            minTvlUSD,
            maxTvlUSD,
            tokenIds,
            risks,
            blockchainIds,
        } = req.query;

        const searchFilters: IFilter = {
            apy30d: {},
            tvlUSD: {},
            overallRiskRating: {},
            blockchainId: {},
        };
        // APY
        if (minAPY) searchFilters.apy30d.gte = minAPY / 100;
        if (maxAPY && maxAPY < 20)
            searchFilters["apy30d"]["lte"] = maxAPY / 100;
        // TVL USD
        if (minTvlUSD) searchFilters.tvlUSD.gte = minTvlUSD;
        if (maxTvlUSD) searchFilters.tvlUSD.lte = maxTvlUSD;
        // risks
        if (risks) {
            const risksArray = risks.split(",");
            searchFilters.overallRiskRating.in = risksArray;
        }
        // tokens
        if (tokenIds) {
            const ids = tokenIds.split(",").map(i => parseInt(i));
            searchFilters.OR = [];
            searchFilters.OR.push({ token0Id: { in: ids } });
            searchFilters.OR.push({ token1Id: { in: ids } });
        }
        if (blockchainIds) {
            const ids = blockchainIds.split(",").map(b => parseInt(b));
            searchFilters.blockchainId.in = ids;
        }
        const [staking, pools] = await Promise.all([
            prisma.staking.findMany({
                where: searchFilters,
                take: 30,
                select: {
                    id: true,
                    address: true,
                    name: true,
                    blockchain: { select: { imageUrl: true, name: true } },
                    protocol: { select: { name: true, id: true } },
                    overallRiskRating: true,
                    tvlUSD: true,
                    apy30d: true,
                    token0: { select: { symbol: true } },
                },
            }),
            prisma.pool.findMany({
                where: searchFilters,
                take: 30,
                select: {
                    id: true,
                    address: true,
                    name: true,
                    fee: true,
                    blockchain: { select: { imageUrl: true, name: true } },
                    protocol: { select: { name: true, id: true } },
                    overallRiskRating: true,
                    tvlUSD: true,
                    apy30d: true,
                    token0: { select: { symbol: true } },
                    token1: { select: { symbol: true } },
                },
            }),
        ]);
        return [...staking, ...pools];
    });
}

export { routes };
