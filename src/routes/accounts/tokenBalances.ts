import { Type } from "@sinclair/typebox";
import { covalentService } from "../../services/covalent";
import { FastifyTypebox } from "../types";

const schema = {
    params: Type.Object({
        address: Type.String(),
        blockchainId: Type.Integer(),
    }),
};

async function routes(fastify: FastifyTypebox) {
    fastify.get("/balances", { schema }, async req => {
        const { blockchainId, address } = req.params;
        const data = await covalentService.getAccountBalances({
            blockchainId,
            address,
        });
        return data;
    });
}

export { routes };
