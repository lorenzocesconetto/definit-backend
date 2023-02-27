import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import Fastify, { FastifyInstance } from "fastify";
import { routes } from "./routes";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import cors from "@fastify/cors";
import { checkEnvVars } from "./utils/checkEnvVars";
import { redirectToHttps } from "./hooks/preHandler";

// This code was inspired by this documentation:
// https://www.fastify.io/docs/latest/Guides/Serverless/#google-cloud-run
// For more details, please visit the URL above.

function build(): FastifyInstance {
    checkEnvVars(); // Checks if environment variables are properly set
    const _server = Fastify({
        trustProxy: true,
        logger: process.env.ENV == "prod",
    }); // Must trust proxy for Google Cloud Run

    const server = _server.withTypeProvider<TypeBoxTypeProvider>();

    // Redirect to https, but only if in production
    if (process.env.ENV == "prod")
        server.addHook("preHandler", redirectToHttps);

    server.register(cors, {
        origin: [
            "https://azion.xyz",
            "https://www.azion.xyz",
            "https://definit.xyz",
            "https://staging.definit.xyz",
            "https://www.definit.xyz",
            "https://localhost:3000",
            "http://localhost:3000",
        ],
    });

    server.get("/", {}, () => {
        return { status: "Healthy" };
    });

    server.register(routes, { prefix: "/v1" });

    return server;
}

async function start() {
    const server = build();

    // Google Cloud Run will set this environment variable, so
    // we can also use it to detect whether we're running in Cloud Run
    const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined;

    // We must listen on the port Cloud Run provides
    const port = process.env.PORT ? parseInt(process.env.PORT) : 8000;

    // We must listen on all IPV4 addresses in Cloud Run
    const host = IS_GOOGLE_CLOUD_RUN ? "0.0.0.0" : undefined;

    try {
        const address = await server.listen({ host, port });
        console.log(`Server running on: ${address}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

if (require.main === module) {
    start();
}

export { build };
