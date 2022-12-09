import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import Fastify from "fastify";
import { routes } from "./routes";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import cors from "@fastify/cors";

const fastify = Fastify().withTypeProvider<TypeBoxTypeProvider>();

fastify.register(cors, { origin: ["http://localhost:3000"] });

fastify.get("/", {}, () => {
    return { status: "Healthy" };
});

fastify.register(routes, { prefix: "/api/v1" });

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
