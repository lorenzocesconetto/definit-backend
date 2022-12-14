import { getTokenBalance } from "./getTokenBalance";
import { getTokenPrice } from "./getTokenPrice";

interface IGetPoolTVL {
    blockchainId: number;
    poolAddress: string;
    token0Address: string;
    token1Address: string;
}

interface RGetPoolTVL {
    tvlUSD: number;
    token0Balance: number;
    token1Balance: number;
    token0Price: number;
    token1Price: number;
}

const getPoolTVL = async ({
    blockchainId,
    poolAddress,
    token0Address,
    token1Address,
}: IGetPoolTVL): Promise<RGetPoolTVL> => {
    const [token0Balance, token1Balance, prices] = await Promise.all([
        getTokenBalance({
            address: poolAddress,
            tokenAddress: token0Address,
            blockchainId,
        }),
        getTokenBalance({
            address: poolAddress,
            tokenAddress: token1Address,
            blockchainId,
        }),
        getTokenPrice({
            address: [token0Address, token1Address],
            blockchainId: blockchainId,
        }),
    ]);
    const token0Price = prices[token0Address.toLowerCase()]["usd"];
    const token1Price = prices[token1Address.toLowerCase()]["usd"];
    const tvlUSD = token0Balance * token0Price + token1Balance * token1Price;
    return { tvlUSD, token0Balance, token1Balance, token0Price, token1Price };
};

export { getPoolTVL };
