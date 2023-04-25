import { prisma } from "../providers/prisma";
import { FastifyTypebox } from "./types";

async function routes(fastify: FastifyTypebox): Promise<void> {
    fastify.get("/", async () => {
        const response = await prisma.token.findMany({
            select: { id: true, symbol: true },
        });
        return response;
    });
}

export { routes };
