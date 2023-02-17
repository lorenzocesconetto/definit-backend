import { FastifyRequest, FastifyReply } from "fastify";

const redirectToHttps = async (req: FastifyRequest, reply: FastifyReply) => {
    const isHttps =
        ((req.headers["x-forwarded-proto"] as string) || "").substring(0, 5) ===
        "https";
    if (isHttps) return; // It is https, pass to route

    const { method, url } = req.raw;

    if (method && ["GET", "HEAD"].includes(method)) {
        const host = req.headers.host || req.hostname;
        return reply.redirect(301, `https://${host}${url}`);
    }
    reply.code(400).send({ error: "Must connect securely through SSL/HTTPS" });
};

export { redirectToHttps };
