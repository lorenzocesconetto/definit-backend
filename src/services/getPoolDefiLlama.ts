interface IPoolDefiLlama {
    timestamp: string;
    tvlUsd: number;
    apy: number;
    apyBase: number;
    apyReward: number | null;
    il7d: number | null;
    apyBase7d: number | null;
}

export type TPoolDefiLlama = IPoolDefiLlama[];

const getPoolDefiLlama = async (
    defiLlamaId: string
): Promise<TPoolDefiLlama> => {
    const baseUrl = `https://yields.llama.fi/chart/${defiLlamaId}`;
    const res = await fetch(baseUrl);
    const json = (await res.json()) as { status: string; data: TPoolDefiLlama };
    return json.data.slice(json.data.length - 90, json.data.length - 1);
};

export { getPoolDefiLlama };
