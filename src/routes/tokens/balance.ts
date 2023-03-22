import { Type } from "@sinclair/typebox";
import { FastifyTypebox } from "../types";
import { web3Service } from "../../services";

const schema = {
    params: Type.Object({
        address: Type.String(),
        blockchainId: Type.Integer(),
        tokenAddress: Type.String(),
    }),
};

async function routes(fastify: FastifyTypebox): Promise<void> {
    fastify.get(
        "/tokens/:tokenAddress/balance/:address",
        { schema },
        async req => {
            const { tokenAddress, blockchainId, address } = req.params;
            const balance = await web3Service.getTokenBalance({
                blockchainId,
                address,
                tokenAddress,
            });
            return balance;
        }
    );
}

export { routes };
