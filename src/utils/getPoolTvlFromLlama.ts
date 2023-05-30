import { TPoolDefiLlama } from "../services/defiLlama";

const getPoolTvlFromLlama = (llama: TPoolDefiLlama): number => {
    return llama[llama.length - 1].tvlUsd;
};

export { getPoolTvlFromLlama };
