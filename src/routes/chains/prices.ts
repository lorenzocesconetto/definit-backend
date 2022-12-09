import { ethers } from "ethers";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { ethereumProvider } from "../../providers/ethers";
import { getPoolImmutables } from "../../services/getPoolImmutables";
import { getPoolState } from "../../services/getPoolState";
import { getTokenAbi } from "../../services/getTokenAbi";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import { getTokenImmutables } from "../../services/getContractImmutables";
import { Type } from "@sinclair/typebox";
import { FastifyTypebox } from "../types";

const schema = {
    params: Type.Object({
        address: Type.String(),
        blockchainId: Type.Integer(),
    }),
};

async function routes(fastify: FastifyTypebox): Promise<void> {
    fastify.get("/protocols/:address/prices", { schema }, async request => {
        const { address, blockchainId } = request.params;

        const poolContract = new ethers.Contract(
            address,
            IUniswapV3PoolABI,
            ethereumProvider
        );

        const [poolImmutables, poolState] = await Promise.all([
            getPoolImmutables(poolContract),
            getPoolState(poolContract),
        ]);

        const [token0Abi, token1Abi] = await Promise.all([
            getTokenAbi(poolImmutables.token0),
            getTokenAbi(poolImmutables.token1),
        ]);

        const token0Contract = new ethers.Contract(
            poolImmutables.token0,
            token0Abi,
            ethereumProvider
        );
        const token1Contract = new ethers.Contract(
            poolImmutables.token1,
            token1Abi,
            ethereumProvider
        );

        const [token0Immutables, token1Immutables] = await Promise.all([
            getTokenImmutables(token0Contract),
            getTokenImmutables(token1Contract),
        ]);

        const Token0 = new Token(
            blockchainId, // ethereum chain id = 1
            poolImmutables.token0,
            token0Immutables.decimals,
            token0Immutables.symbol,
            token0Immutables.name
        );
        const Token1 = new Token(
            blockchainId, // ethereum chain id = 1
            poolImmutables.token1,
            token1Immutables.decimals,
            token1Immutables.symbol,
            token1Immutables.name
        );

        const POOL = new Pool(
            Token0,
            Token1,
            poolImmutables.fee,
            poolState.sqrtPriceX96.toString(),
            poolState.liquidity.toString(),
            poolState.tick
        );

        const token0Price = POOL.token0Price;
        const token1Price = POOL.token1Price;
        return { token0Price, token1Price };
    });
}

export { routes };
