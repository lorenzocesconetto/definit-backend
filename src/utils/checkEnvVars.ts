const checkEnvVars = () => {
    if (!process.env.DATABASE_URL) {
        throw new Error("Environment variable DATABASE_URL must be set");
    }
    if (!process.env.INFURA_ETHEREUM_URL) {
        throw new Error("Environment variable INFURA_ETHEREUM_URL must be set");
    }
    if (!process.env.INFURA_POLYGON_URL) {
        throw new Error("Environment variable INFURA_POLYGON_URL must be set");
    }
    if (!process.env.INFURA_ARBITRUM_URL) {
        throw new Error("Environment variable INFURA_ARBITRUM_URL must be set");
    }
    if (!process.env.ETHERSCAN_API_KEY) {
        throw new Error("Environment variable ETHERSCAN_API_KEY must be set");
    }
};
export { checkEnvVars };
