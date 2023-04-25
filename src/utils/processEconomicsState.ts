import { RGetPoolTVL, TGetPoolSubgraph, TPoolDefiLlama } from "../services";
import { getPoolAPY30d } from "./getPoolAPY30d";
import { getPoolEarnings30d } from "./getPoolEarnings30d";
import { getPoolTvlVariation30d } from "./getPoolTvlVariation30d";
import { getPoolVolume30d } from "./getPoolVolume30d";

interface EconomicsState {
    tvlUSD: number;
    token0Balance: number;
    token1Balance: number;
    tvlVariation30d: number;
    apy30d: number;
    llama: string;
    earnings30d: number;
    volume30d: number;
}
const processEconomicsState = (
    tvl: RGetPoolTVL,
    subgraph: TGetPoolSubgraph,
    llama: TPoolDefiLlama
): EconomicsState => {
    return {
        tvlUSD: tvl.tvlUSD,
        token0Balance: tvl.token0Balance,
        token1Balance: tvl.token1Balance,
        tvlVariation30d: getPoolTvlVariation30d(tvl.tvlUSD, llama),
        apy30d: getPoolAPY30d(llama),
        llama: JSON.stringify(llama),
        earnings30d: getPoolEarnings30d(subgraph),
        volume30d: getPoolVolume30d(subgraph),
    };
};

export { processEconomicsState };
