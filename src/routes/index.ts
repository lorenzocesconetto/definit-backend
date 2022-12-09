import { FastifyInstance } from "fastify";
import { routes as protocolsRoutes } from "./chains";
import { routes as poolsRoutes } from "./pools";

async function routes(fastify: FastifyInstance) {
    fastify.register(protocolsRoutes, { prefix: "/chains/:blockchainId" });
    fastify.register(poolsRoutes);
}

export { routes };
