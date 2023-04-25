import { getCurrentTimestampInSeconds } from "../utils/getCurrentTimestamp";
import { defiLlamaService } from "./defiLlama";
import { subgraphService } from "./subgraph";
import { web3Service } from "./web3";
import { Pool, Protocol, Blockchain, Token } from "@prisma/client";

type TPool = Pool & {
    protocol: Protocol;
    blockchain: Blockchain;
    token0: Token;
    token1: Token;
};

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
