import { Type } from "@sinclair/typebox";
import { ETHEREUM_BLOCKCHAIN_ID } from "../../utils/constants";
import { FastifyTypebox } from "../types";

const schema = {
    params: Type.Object({
        address: Type.String(),
        blockchainId: Type.Integer(),
    }),
};

async function router(fastify: FastifyTypebox) {
    fastify.get("/tokenTransactions", { schema }, async req => {
        const { address, blockchainId } = req.params;
        // const url = "http://api.etherscan.io/api?module=account&action=tokentx&address=0x9f7dd5ea934d188a599567ee104e97fa46cb4496&startblock=0&endblock=999999999&sort=desc&apikey=YourApiKeyToken";
        let url;
        if (blockchainId === ETHEREUM_BLOCKCHAIN_ID)
            url = `http://api.etherscan.io/api?module=account&action=tokentx&address=${address}&sort=desc&apikey=YourApiKeyToken`;
        else {
            return "";
        }
        return url;
    });
}

export { router };
