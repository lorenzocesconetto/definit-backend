/* eslint-disable indent */
import { ethers } from "ethers";
import {
    ARBITRUM_BLOCKCHAIN_ID,
    ETHEREUM_BLOCKCHAIN_ID,
    POLYGON_BLOCKCHAIN_ID,
} from "../utils/constants";

const INFURA_ETHEREUM_URL = process.env.INFURA_ETHEREUM_URL;
const INFURA_POLYGON_URL = process.env.INFURA_POLYGON_URL;
const INFURA_ARBITRUM_URL = process.env.INFURA_ARBITRUM_URL;

const ethereumProvider = new ethers.providers.JsonRpcProvider(
    INFURA_ETHEREUM_URL
);

const polygonProvider = new ethers.providers.JsonRpcProvider(
    INFURA_POLYGON_URL
);

const arbitrumProvider = new ethers.providers.JsonRpcProvider(
    INFURA_ARBITRUM_URL
);

const getProvider = (chainId: number): ethers.providers.JsonRpcProvider => {
    switch (chainId) {
        case ETHEREUM_BLOCKCHAIN_ID:
            return ethereumProvider;
        case ARBITRUM_BLOCKCHAIN_ID:
            return arbitrumProvider;
        case POLYGON_BLOCKCHAIN_ID:
            return polygonProvider;
        default:
            throw new Error("Unknown chain");
    }
};

export { ethereumProvider, polygonProvider, arbitrumProvider, getProvider };
