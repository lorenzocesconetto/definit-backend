/* eslint-disable indent */
import { ethers } from "ethers";

// const INFURA_ETHEREUM_URL = process.env.INFURA_ETHEREUM_URL;
// const INFURA_POLYGON_URL = process.env.INFURA_POLYGON_URL;
// const INFURA_ARBITRUM_URL = process.env.INFURA_ARBITRUM_URL;

// console.log("INFURA_ETHEREUM_URL", process.env.INFURA_ETHEREUM_URL);
// console.log("INFURA_POLYGON_URL", process.env.INFURA_POLYGON_URL);
// console.log("INFURA_ARBITRUM_URL", process.env.INFURA_ARBITRUM_URL);

const INFURA_ETHEREUM_URL =
    "https://mainnet.infura.io/v3/cd536cadae114c8e8e7f885bc0beb03a";
const INFURA_POLYGON_URL =
    "https://polygon-mainnet.infura.io/v3/cd536cadae114c8e8e7f885bc0beb03a";
const INFURA_ARBITRUM_URL =
    "https://arbitrum-mainnet.infura.io/v3/cd536cadae114c8e8e7f885bc0beb03a";

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
        case 1:
            return ethereumProvider;
        case 42161:
            return arbitrumProvider;
        case 137:
            return polygonProvider;
        default:
            throw new Error("Unknown chain");
    }
};

export { ethereumProvider, polygonProvider, arbitrumProvider, getProvider };
