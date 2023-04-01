import { FastifyInstance } from "fastify";
import { routes as balanceRoutes } from "./balance";
import { routes as priceRoutes } from "./price";

async function routes(fastify: FastifyInstance) {
    fastify.register(balanceRoutes);
    fastify.register(priceRoutes);
}

export { routes };
