import { FastifyInstance } from "fastify";
import { routes as protocolsRoutes } from "./chains";
import { routes as poolsRoutes } from "./pools";
import { routes as tokensRoutes } from "./tokens";

async function routes(fastify: FastifyInstance) {
    fastify.register(protocolsRoutes, { prefix: "/chains/:blockchainId" });
    fastify.register(poolsRoutes);
    fastify.register(tokensRoutes, { prefix: "/chains/:blockchainId" });
}

export { routes };
