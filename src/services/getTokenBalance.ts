import { ethers } from "ethers";
import { getProvider } from "../providers/ethers";
import abi from "../../erc20.abi.json";

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

export { getTokenBalance };
