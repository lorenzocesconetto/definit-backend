import { ethers } from "ethers";
import {
    ARBITRUM_BLOCKCHAIN,
    ETHEREUM_BLOCKCHAIN,
    POLYGON_BLOCKCHAIN,
    OPTIMISM_BLOCKCHAIN,
} from "../utils/constants";

const INFURA_ETHEREUM_URL = process.env.INFURA_ETHEREUM_URL;
const INFURA_POLYGON_URL = process.env.INFURA_POLYGON_URL;
const INFURA_ARBITRUM_URL = process.env.INFURA_ARBITRUM_URL;
const INFURA_OPTIMISM_URL = process.env.INFURA_OPTIMISM_URL;

const ethereumProvider = new ethers.providers.JsonRpcProvider(
    INFURA_ETHEREUM_URL
);

const polygonProvider = new ethers.providers.JsonRpcProvider(
    INFURA_POLYGON_URL
);

const arbitrumProvider = new ethers.providers.JsonRpcProvider(
    INFURA_ARBITRUM_URL
);

const optimismProvider = new ethers.providers.JsonRpcProvider(
    INFURA_OPTIMISM_URL
);

const getProvider = (chainId: number): ethers.providers.JsonRpcProvider => {
    if (chainId === ETHEREUM_BLOCKCHAIN.blockchainId) return ethereumProvider;
    else if (chainId === POLYGON_BLOCKCHAIN.blockchainId)
        return polygonProvider;
    else if (chainId === ARBITRUM_BLOCKCHAIN.blockchainId)
        return arbitrumProvider;
    else if (chainId === OPTIMISM_BLOCKCHAIN.blockchainId)
        return optimismProvider;
    else throw new Error("Unknown blockchainId");
};

export { ethereumProvider, polygonProvider, arbitrumProvider, getProvider };
