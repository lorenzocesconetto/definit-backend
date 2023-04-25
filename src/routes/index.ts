import { FastifyInstance } from "fastify";
import { routes as protocolsRoutes } from "./chains";
import { routes as poolsRoutes } from "./pools";
import { routes as tokensRoutes } from "./tokens";
import { routes as accountsRoutes } from "./accounts";
import { routes as searchRoutes } from "./search";
import { routes as assetsRoutes } from "./assets";
import { routes as blockchainsRoutes } from "./blockchains";

async function routes(fastify: FastifyInstance) {
    fastify.register(protocolsRoutes, { prefix: "/chains/:blockchainId" });
    fastify.register(poolsRoutes);
    fastify.register(tokensRoutes, { prefix: "/chains/:blockchainId/tokens" });
    fastify.register(accountsRoutes, {
        prefix: "/chains/:blockchainId/addresses/:address",
    });
    fastify.register(searchRoutes, { prefix: "/search" });
    fastify.register(assetsRoutes, { prefix: "/assets" });
    fastify.register(blockchainsRoutes, { prefix: "/blockchains" });
}

export { routes };
