import { TPoolDefiLlama } from "../services/getPoolDefiLlama";

const getPoolAPY30d = (llama: TPoolDefiLlama): number => {
    const llama30d = llama.slice(llama.length - 30, llama.length);
    const cumApy = llama30d.reduce(
        (cum, curr) => cum * (1 + curr.apy / 100),
        1
    );
    return cumApy ** (1 / 30) - 1; // geometric mean
};

export { getPoolAPY30d };
