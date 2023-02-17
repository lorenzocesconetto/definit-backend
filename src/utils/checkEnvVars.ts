const checkEnvVars = () => {
    const envVars = [
        "DATABASE_URL",
        "INFURA_ETHEREUM_URL",
        "INFURA_POLYGON_URL",
        "INFURA_ARBITRUM_URL",
        "ETHERSCAN_API_KEY",
        "ENV",
    ];

    envVars.forEach((varName: string) => {
        if (!process.env[varName])
            throw new Error(`Environment variable ${varName} must be set`);
    });
};

export { checkEnvVars };
