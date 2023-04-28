import { getCurrentTimestampInSeconds } from "../utils/getCurrentTimestamp";
import { defiLlamaService } from "./defiLlama";
import { subgraphService } from "./subgraph";
import { web3Service } from "./web3";
// import { Pool, Protocol, Blockchain } from "@prisma/client";

interface TPool {
    blockchainId: number;
    address: string;
    token0Address: string;
    token1Address: string;
    defiLlamaId: string;
}

const getPoolStateEconomics = async (pool: TPool, subgraphUrl: string) => {
    const response = await Promise.all([
        web3Service.getPoolTVL({
            blockchainId: pool.blockchainId,
            poolAddress: pool.address,
            token0Address: pool.token0Address,
            token1Address: pool.token1Address,
        }),
        subgraphService.getPoolSubgraph({
            address: pool.address,
            endTime: getCurrentTimestampInSeconds(),
            first: 30,
            skip: 0,
            subgraphUrl: subgraphUrl,
        }),
        defiLlamaService.getPoolDefiLlama(pool.defiLlamaId),
    ]);
    return response;
};

export const composedService = { getPoolStateEconomics };
