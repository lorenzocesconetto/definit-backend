import { Contract, ethers } from "ethers";
import { getProvider } from "../providers/ethers";
import abi from "../../erc20.abi.json";
import { prisma } from "../providers/prisma";
import { coinGeckoService } from "./coinGecko";

////////////////////////////////////////////////////
// ERC20 Token Immutables
////////////////////////////////////////////////////

interface contractImmutables {
    symbol: string;
    decimals: number;
    name: string;
}

const getTokenImmutables = async (tokenContract: Contract) => {
    const [symbol, name, decimals] = await Promise.all([
        tokenContract.symbol(),
        tokenContract.name(),
        tokenContract.decimals(),
    ]);

    const immutables: contractImmutables = {
        symbol,
        decimals,
        name,
    };

    return immutables;
};

////////////////////////////////////////////////////
// Pool Immutables
////////////////////////////////////////////////////

interface PoolImmutables {
    factory: string;
    token0: string;
    token1: string;
    fee: number;
    tickSpacing: number;
    maxLiquidityPerTick: number;
}

const getPoolImmutables = async (poolContract: Contract) => {
    const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] =
        await Promise.all([
            poolContract.factory(),
            poolContract.token0(),
            poolContract.token1(),
            poolContract.fee(),
            poolContract.tickSpacing(),
            poolContract.maxLiquidityPerTick(),
        ]);

    const immutables: PoolImmutables = {
        factory,
        token0,
        token1,
        fee,
        tickSpacing,
        maxLiquidityPerTick,
    };
    return immutables;
};

////////////////////////////////////////////////////
// Pool State
////////////////////////////////////////////////////

interface State {
    liquidity: ethers.BigNumber;
    sqrtPriceX96: ethers.BigNumber;
    tick: number;
    observationIndex: number;
    observationCardinality: number;
    observationCardinalityNext: number;
    feeProtocol: number;
    unlocked: boolean;
}

const getPoolState = async (poolContract: Contract) => {
    const [liquidity, slot] = await Promise.all([
        poolContract.liquidity(),
        poolContract.slot0(),
    ]);

    const PoolState: State = {
        liquidity,
        sqrtPriceX96: slot[0],
        tick: slot[1],
        observationIndex: slot[2],
        observationCardinality: slot[3],
        observationCardinalityNext: slot[4],
        feeProtocol: slot[5],
        unlocked: slot[6],
    };

    return PoolState;
};

////////////////////////////////////////////////////
// Balance of a single token on an address
////////////////////////////////////////////////////

// See:
// https://stackoverflow.com/questions/71814845/how-to-calculate-uniswap-v3-pools-total-value-locked-tvl-on-chain

interface IGetTokenBalance {
    blockchainId: number;
    address: string;
    tokenAddress: string;
}
const getTokenBalance = async ({
    address,
    tokenAddress,
    blockchainId,
}: IGetTokenBalance) => {
    const provider = getProvider(blockchainId);
    const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
    const [decimals, balance] = await Promise.all([
        tokenContract.decimals(),
        tokenContract.balanceOf(address),
    ]);
    return balance / 10 ** decimals;
};

////////////////////////////////////////////////////
// Get Pool TVL
////////////////////////////////////////////////////

interface IGetPoolTVL {
    blockchainId: number;
    poolAddress: string;
    token0Address: string;
    token1Address: string;
}

interface RGetPoolTVL {
    tvlUSD: number;
    token0Balance: number;
    token1Balance: number;
    token0Price: number;
    token1Price: number;
}

const getPoolTVLById = async (poolId: number) => {
    const pool = await prisma.pool.findUniqueOrThrow({ where: { id: poolId } });
    const data = await getPoolTVL({
        blockchainId: pool.blockchainId,
        poolAddress: pool.address,
        token0Address: pool.token0Address,
        token1Address: pool.token1Address,
    });
    return data;
};

const getPoolTVL = async ({
    blockchainId,
    poolAddress,
    token0Address,
    token1Address,
}: IGetPoolTVL): Promise<RGetPoolTVL> => {
    const [token0Balance, token1Balance, prices] = await Promise.all([
        getTokenBalance({
            address: poolAddress,
            tokenAddress: token0Address,
            blockchainId,
        }),
        getTokenBalance({
            address: poolAddress,
            tokenAddress: token1Address,
            blockchainId,
        }),
        coinGeckoService.getTokenPrice({
            address: [token0Address, token1Address],
            blockchainId: blockchainId,
        }),
    ]);
    const token0Price = prices[token0Address.toLowerCase()]["usd"];
    const token1Price = prices[token1Address.toLowerCase()]["usd"];
    const tvlUSD = token0Balance * token0Price + token1Balance * token1Price;
    return { tvlUSD, token0Balance, token1Balance, token0Price, token1Price };
};

export const web3Service = {
    getPoolState,
    getTokenImmutables,
    getPoolImmutables,
    getTokenBalance,
    getPoolTVL,
    getPoolTVLById,
};
