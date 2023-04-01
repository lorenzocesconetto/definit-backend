import { Type } from "@sinclair/typebox";
import { coinGeckoService } from "../../services";
import { FastifyTypebox } from "../types";

const schema = {
    params: Type.Object({
        blockchainId: Type.Integer(),
        tokenAddress: Type.String(),
    }),
};

async function routes(fastify: FastifyTypebox): Promise<void> {
    fastify.get("/:tokenAddress/price", { schema }, async req => {
        const { tokenAddress, blockchainId } = req.params;
        const price = await coinGeckoService.getTokenPrice({
            address: tokenAddress,
            blockchainId,
        });
        return price[tokenAddress.toLowerCase()]["usd"];
    });
}

export { routes };
