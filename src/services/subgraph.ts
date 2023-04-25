interface IgetPoolSubgraph {
    address: string;
    skip: number;
    first: number;
    endTime: number;
    subgraphUrl: string;
}

export interface IPoolSubgraph {
    date: number;
    volumeUSD: string;
    tvlUSD: string;
    feesUSD: string;
    liquidity: string;
    token0Price: string;
    token1Price: string;
    pool: {
        feeTier: string;
        __typename: string;
    };
    __typename: string;
}
export type TGetPoolSubgraph = IPoolSubgraph[];

const getPoolSubgraph = async ({
    address,
    endTime,
    skip,
    first,
    subgraphUrl,
}: IgetPoolSubgraph): Promise<TGetPoolSubgraph> => {
    const body = {
        operationName: "poolDayDatas",
        variables: {
            address,
            endTime,
            skip,
            first,
        },
        query: `
        query poolDayDatas($endTime: Int!, $skip: Int!, $address: Bytes!, $first: Int!) {
            poolDayDatas(
                first: $first,
                skip: $skip,
                where: {pool: $address, date_lt: $endTime},
                orderBy: date,
                orderDirection: desc,
                subgraphError: allow) {
                    date
                    volumeUSD
                    tvlUSD
                    feesUSD
                    liquidity
                    token0Price
                    token1Price
                    volumeUSD
                    pool {
                        feeTier
                        __typename
                    }
                    __typename
            }
        }
        `,
    };
    const response = await fetch(subgraphUrl, {
        body: JSON.stringify(body),
        method: "POST",
    });
    const json = await response.json();
    const data: IPoolSubgraph[] = json.data.poolDayDatas;
    return data;
};

export const subgraphService = { getPoolSubgraph };
