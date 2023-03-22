interface IBlockchain {
    blockchainId: number;
    subgraphUrl: string;
    coinGeckoId: string;
}

const ETHEREUM_BLOCKCHAIN_ID = 1;
const POLYGON_BLOCKCHAIN_ID = 137;
const ARBITRUM_BLOCKCHAIN_ID = 42161;

const ETHEREUM_SUBGRAPH_URL =
    "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";
const POLYGON_SUBGRAPH_URL =
    "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon";
// "https://api.thegraph.com/subgraphs/name/messari/uniswap-v3-polygon";
const ARBITRUM_SUBGRAPH_URL =
    "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-arbitrum-one";

const ETHEREUM_BLOCKCHAIN: IBlockchain = {
    coinGeckoId: "ethereum",
    blockchainId: ETHEREUM_BLOCKCHAIN_ID,
    subgraphUrl: ETHEREUM_SUBGRAPH_URL,
};
const POLYGON_BLOCKCHAIN: IBlockchain = {
    coinGeckoId: "polygon-pos",
    blockchainId: POLYGON_BLOCKCHAIN_ID,
    subgraphUrl: POLYGON_SUBGRAPH_URL,
};
const ARBITRUM_BLOCKCHAIN: IBlockchain = {
    coinGeckoId: "arbitrum-one",
    blockchainId: ARBITRUM_BLOCKCHAIN_ID,
    subgraphUrl: ARBITRUM_SUBGRAPH_URL,
};

// Covalent API
const COVALENT_API_KEY = "feb5d1862de148278e7f1100222";
const COVALENT_BASE_URL = "https://api.covalenthq.com/v1";

export {
    ETHEREUM_BLOCKCHAIN_ID,
    ETHEREUM_BLOCKCHAIN,
    POLYGON_BLOCKCHAIN,
    ARBITRUM_BLOCKCHAIN,
    COVALENT_API_KEY,
    COVALENT_BASE_URL,
};
