import { Type } from "@sinclair/typebox";
import { covalentService } from "../../services/covalentService";
import { FastifyTypebox } from "../types";

const schema = {
    params: Type.Object({
        address: Type.String(),
        blockchainId: Type.Integer(),
    }),
    querystring: Type.Object({
        limit: Type.Integer(),
        page: Type.Integer(),
    }),
};

async function routes(fastify: FastifyTypebox) {
    fastify.get("/transactions", { schema }, async req => {
        const { address, blockchainId } = req.params;
        const { limit, page } = req.query;
        const data = await covalentService.getAccountTransactions({
            address,
            blockchainId,
            limit,
            page,
        });
        return data;
    });
}
export { routes };
