import { Type } from "@sinclair/typebox";
import { prisma } from "../providers/prisma";
import { getPoolTVL } from "../services";
import { FastifyTypebox } from "./types";

const schema = {
    params: Type.Object({
        id: Type.Integer(),
    }),
};

async function routes(fastify: FastifyTypebox): Promise<void> {
    fastify.get("/pools/best-risk-reward", async () => {
        const pool = await prisma.pool.findMany({
            where: { id: { in: [1, 2, 3] } },
            include: {
                blockchain: true,
                protocol: true,
                token0: true,
                token1: true,
            },
        });
        return pool;
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
        const res = await getPoolTVL({
            blockchainId: pool.blockchainId,
            poolAddress: pool.address,
            token0Address: pool.token0Address,
            token1Address: pool.token1Address,
        });

        return {
            ...pool,
            ...res,
        };
    });
}

export { routes };