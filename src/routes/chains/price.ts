import { ethers } from "ethers";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { abi as QuoterABI } from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import { ethereumProvider } from "../../providers/ethers";
import { getContractAbi } from "../../services/getContractAbi";
import { getTokenImmutables } from "../../services/getContractImmutables";
import { Type } from "@sinclair/typebox";
import { FastifyTypebox } from "../types";

const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

const schema = {
    params: Type.Object({
        address: Type.String(),
    }),
};

async function routes(fastify: FastifyTypebox): Promise<void> {
    fastify.get("/protocols/:address/price", { schema }, async request => {
        const { address } = request.params;

        const poolContract = new ethers.Contract(
            address,
            IUniswapV3PoolABI,
            ethereumProvider
        );

        const [token0, token1, fee] = await Promise.all([
            poolContract.token0(),
            poolContract.token1(),
            poolContract.fee(),
        ]);

        const [token0Abi, token1Abi] = await Promise.all([
            getContractAbi(token0),
            getContractAbi(token1),
        ]);

        const token0Contract = new ethers.Contract(
            token0,
            token0Abi,
            ethereumProvider
        );
        const token1Contract = new ethers.Contract(
            token1,
            token1Abi,
            ethereumProvider
        );

        const [token0Immutables, token1Immutables] = await Promise.all([
            getTokenImmutables(token0Contract),
            getTokenImmutables(token1Contract),
        ]);

        const quoterContract = new ethers.Contract(
            quoterAddress,
            QuoterABI,
            ethereumProvider
        );

        const amountIn = ethers.utils.parseUnits(
            "1",
            token0Immutables.decimals
        );

        const quotedAmountOut =
            await quoterContract.callStatic.quoteExactInputSingle(
                token0,
                token1,
                fee,
                amountIn,
                0
            );

        const amountOut = ethers.utils.formatUnits(
            quotedAmountOut,
            token1Immutables.decimals
        );

        return {
            amountOut,
            token0Symbol: token0Immutables.symbol,
            token1Symbol: token1Immutables.symbol,
            token0Name: token0Immutables.name,
            token1Name: token1Immutables.name,
        };
    });
}

export { routes };
