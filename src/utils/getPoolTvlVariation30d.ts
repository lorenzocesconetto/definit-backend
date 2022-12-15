import { TPoolDefiLlama } from "../services/getPoolDefiLlama";

const getPoolTvlVariation30d = (
    currentTvl: number,
    llama: TPoolDefiLlama
): number => {
    const tvl30d = llama[llama.length - 30 - 1].tvlUsd;
    const variation = currentTvl / tvl30d - 1;
    return variation;
};

export { getPoolTvlVariation30d };
