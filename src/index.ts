import Fastify from "fastify";
import { routes } from "./routes";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastifyEnv from "@fastify/env";

const fastify = Fastify().withTypeProvider<TypeBoxTypeProvider>();

const schema = {
    type: "object",
    required: ["PORT"],
    properties: {
        PORT: {
            type: "string",
            default: 3000,
        },
    },
};

const options = {
    schema,
    dotenv: true, // will read .env in root folder
};

fastify.register(fastifyEnv, options).ready(err => {
    if (err) console.error(err);
});

fastify.get("/", {}, () => {
    return { status: "Healthy" };
});

fastify.register(routes, { prefix: "/api/v1/chains/:chainId" });

fastify.listen({ port: 8000 }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }

    if (!process.env.DATABASE_URL) {
        throw new Error("Environment variable DATABASE_URL must be set");
    }
    if (!process.env.INFURA_ETHEREUM_URL) {
        throw new Error("Environment variable INFURA_ETHEREUM_URL must be set");
    }
    if (!process.env.INFURA_POLYGON_URL) {
        throw new Error("Environment variable INFURA_POLYGON_URL must be set");
    }
    if (!process.env.INFURA_ARBITRUM_URL) {
        throw new Error("Environment variable INFURA_ARBITRUM_URL must be set");
    }
    console.log(`Server running on: ${address}`);
});
