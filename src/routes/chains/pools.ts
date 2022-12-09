import { Type } from "@sinclair/typebox";
import { prisma } from "../../providers/prisma";
import { FastifyTypebox } from "../types";

const schema = {
    params: Type.Object({
        address: Type.String(),
        blockchainId: Type.Integer(),
    }),
};

async function routes(fastify: FastifyTypebox): Promise<void> {
    fastify.get("/pools/:address", { schema }, async req => {
        const { address, blockchainId } = req.params;
        const pool = await prisma.pool.findFirstOrThrow({
            where: { address, blockchainId },
        });
        return pool;
    });

    fastify.get("/pools/:address/details", { schema }, async req => {
        const { address, blockchainId } = req.params;
        const pool = await prisma.pool.findFirstOrThrow({
            where: { address, blockchainId },
            include: {
                blockchain: true,
                protocol: true,
                token0: true,
                token1: true,
            },
        });
        return pool;
    });
}

export { routes };
