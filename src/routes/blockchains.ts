import { prisma } from "../providers/prisma";
import { FastifyTypebox } from "./types";

async function routes(fastify: FastifyTypebox): Promise<void> {
    fastify.get("/", async () => {
        const response = await prisma.blockchain.findMany({
            select: { id: true, name: true, imageUrl: true },
        });
        return response;
    });
}

export { routes };
