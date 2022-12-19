// See this repo for reference:
// https://github.com/juddbaguio/vercel-fastify-serverless

import * as dotenv from "dotenv";
dotenv.config();

import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { build } from "../src";

// Instantiate Fastify with some config
const app = Fastify({
    logger: true,
});

// Register your application as a normal plugin.
app.register(build);

export default async (req: FastifyRequest, res: FastifyReply) => {
    await app.ready();
    app.server.emit("request", req, res);
};
