import { Type } from "@sinclair/typebox";
import { ethers } from "ethers";
import { getProvider } from "../../providers/ethers";
import { prisma } from "../../providers/prisma";
import { getPoolState } from "../../services/getPoolState";
import { getPoolSubgraph } from "../../services/getPoolSubgraph";
import { getBlockchain } from "../../utils/getBlockchain";
import { getCurrentTimestampInSeconds } from "../../utils/getCurrentTimestamp";
import { FastifyTypebox } from "../types";
import { abi } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";

const schema = {
    params: Type.Object({
        address: Type.String(),
        blockchainId: Type.Integer(),
    }),
};

async function routes(fastify: FastifyTypebox): Promise<void> {
    fastify.get("/pools/:address/state", { schema }, async req => {
        const { blockchainId, address } = req.params;
        const provider = getProvider(blockchainId);
        const contract = new ethers.Contract(address, abi, provider);
        const data = await getPoolState(contract);
        return data;
    });

    fastify.get("/pools/:address/subgraph", { schema }, async req => {
        const blockchain = getBlockchain(req.params.blockchainId);
        const data = await getPoolSubgraph({
            address: req.params.address,
            first: 30,
            skip: 0,
            subgraphUrl: blockchain.subgraphUrl,
            endTime: getCurrentTimestampInSeconds(),
        });
        return data;
    });

    fastify.get("/pools/:address/details", { schema }, async req => {
        const { address, blockchainId } = req.params;
        const pool = await prisma.pool.findFirstOrThrow({
            where: { address, blockchainId },
            include: {
                blockchain: true,
                protocol: true,
                token0: true,
                token1: true,
            },
        });
        return pool;
    });

    fastify.get("/pools/:address", { schema }, async req => {
        const { address, blockchainId } = req.params;
        const pool = await prisma.pool.findFirstOrThrow({
            where: { address, blockchainId },
        });
        return pool;
    });
}

export { routes };
