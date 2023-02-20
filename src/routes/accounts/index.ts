import { FastifyInstance } from "fastify";
import { routes as tokenBalancesRoutes } from "./tokenBalances";
import { routes as transactionsRoutes } from "./transactions";

async function routes(fastify: FastifyInstance) {
    fastify.register(tokenBalancesRoutes);
    fastify.register(transactionsRoutes);
}

export { routes };
