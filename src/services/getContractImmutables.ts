import { Contract } from "ethers";

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

export { getTokenImmutables };
