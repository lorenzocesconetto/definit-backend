import { Type } from "@sinclair/typebox";
import { FastifyTypebox } from "../types";
// import { coinGeckoService } from "../../services";

const DAI_ADDRESSES = [
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
];
const ETHER_ADDRESSES = [
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
];
const BITCOIN_ADDRESSES = [
    "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
];
const MATIC_ADDRESSES = [
    "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
];

const schema = {
    params: Type.Object({
        blockchainId: Type.Integer(),
        tokenAddress: Type.String(),
    }),
};

async function routes(fastify: FastifyTypebox): Promise<void> {
    fastify.get("/:tokenAddress/price", { schema }, async req => {
        const { tokenAddress } = req.params;
        // const price = await coinGeckoService.getTokenPrice({
        //     address: tokenAddress,
        //     blockchainId,
        // });
        // return price[tokenAddress.toLowerCase()]["usd"];

        if (DAI_ADDRESSES.includes(tokenAddress)) {
            return 0.9998;
        } else if (ETHER_ADDRESSES.includes(tokenAddress)) {
            return 1822.17;
        } else if (BITCOIN_ADDRESSES.includes(tokenAddress)) {
            return 28_172.2;
        } else if (MATIC_ADDRESSES.includes(tokenAddress)) {
            return 1.17;
        } else {
            return 0;
        }
    });
}

export { routes };
