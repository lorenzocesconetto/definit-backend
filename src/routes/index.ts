import { FastifyInstance } from "fastify";
import { routes as protocolsRoutes } from "./protocols";

async function routes(fastify: FastifyInstance) {
    fastify.register(protocolsRoutes);
}

export { routes };
