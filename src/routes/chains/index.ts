import { FastifyInstance } from "fastify";
import { routes as pricesRoutes } from "./prices";
import { routes as priceRoutes } from "./price";
import { routes as protocolRoutes } from "./protocol";
import { routes as poolsRoutes } from "./pools";

async function routes(fastify: FastifyInstance) {
    fastify.register(pricesRoutes);
    fastify.register(priceRoutes);
    fastify.register(protocolRoutes);
    fastify.register(poolsRoutes);
}

export { routes };
