import { FastifyInstance } from "fastify";
import { routes as balanceRoutes } from "./balance";

async function routes(fastify: FastifyInstance) {
    fastify.register(balanceRoutes);
}

export { routes };
