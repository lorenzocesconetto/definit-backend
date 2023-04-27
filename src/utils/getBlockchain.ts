import {
    ETHEREUM_BLOCKCHAIN,
    POLYGON_BLOCKCHAIN,
    ARBITRUM_BLOCKCHAIN,
    OPTIMISM_BLOCKCHAIN,
} from "./constants";

const getBlockchain = (id: number) => {
    if (id === ETHEREUM_BLOCKCHAIN.blockchainId) return ETHEREUM_BLOCKCHAIN;
    else if (id === POLYGON_BLOCKCHAIN.blockchainId) return POLYGON_BLOCKCHAIN;
    else if (id === ARBITRUM_BLOCKCHAIN.blockchainId)
        return ARBITRUM_BLOCKCHAIN;
    else if (id === OPTIMISM_BLOCKCHAIN.blockchainId)
        return OPTIMISM_BLOCKCHAIN;
    else throw new Error("Unknown blockchainId");
};

export { getBlockchain };
