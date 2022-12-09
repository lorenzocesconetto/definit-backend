import { ethers } from "ethers";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { getProvider } from "../../providers/ethers";
import { getPoolImmutables } from "../../services/getPoolImmutables";
import { getPoolState } from "../../services/getPoolState";
import { Type } from "@sinclair/typebox";
import { FastifyTypebox } from "../types";

const schema = {
    params: Type.Object({
        address: Type.String(),
        chainId: Type.Integer(),
    }),
};

async function routes(fastify: FastifyTypebox) {
    fastify.get("/protocols/:address", { schema }, async request => {
        const { address: poolAddress, chainId } = request.params;
        const provider = getProvider(chainId);
        const poolContract = new ethers.Contract(
            poolAddress,
            IUniswapV3PoolABI,
            provider
        );

        const [immutables, state] = await Promise.all([
            getPoolImmutables(poolContract),
            getPoolState(poolContract),
        ]);

        return { immutables, state };
    });
}

export { routes };
