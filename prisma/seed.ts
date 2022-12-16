import { PrismaClient, Prisma } from "@prisma/client";
import {
    ARBITRUM_BLOCKCHAIN,
    ETHEREUM_BLOCKCHAIN,
    POLYGON_BLOCKCHAIN,
} from "../src/utils/constants";

const prisma = new PrismaClient();

const tokenData: Prisma.TokenCreateInput[] = [
    {
        id: 1,
        name: "USDC",
        symbol: "USDC",
        strengthRating: "A",
        strengthDescription: [
            "USDC is a large-cap, fully collateralized asset. This asset depends on a centralized entity for custody services. This asset is exposed to the underlying risks of Polygon PoS bridge, a protocol rated as Moderately Risky. USDC on Polygon is backed 1:1 by USDC locked in the Polygon PoS bridge protocol on the Ethereum chain. USDC is fully redeemable for its USD reserves, providing an effective mechanism to retain the peg to $1. The asset has an uncapped supply but has inflation control or burn mechanisms in place.",
            "USDC is a stablecoin that usually trades within 20bps of its peg to USD, which makes it a solid store of value.",
        ],
        volatilityRating: "A",
        volatilityDescription: [
            "USDC is a stablecoin that usually trades within 20bps of its peg to USD, which makes it a solid store of value. USDC is fully redeemable for its USD reserves, providing an effective mechanism to retain the peg to $1.",
        ],
    },
    {
        id: 2,
        name: "Wrapped Ethereum",
        symbol: "WETH",
        strengthRating: "B",
        strengthDescription: [
            // eslint-disable-next-line quotes
            'ETH is a large-cap asset that represents the blockchain\'s native currency or monetary fee used to execute transactions on the network. This asset is exposed to the underlying risks of Polygon PoS bridge, a protocol rated as Moderately Risky. WETH on Polygon is backed 1:1 by ETH locked in the Polygon PoS bridge protocol on the Ethereum chain. ETH is "wrapped" to make it compatible with DeFi smart contracts. 1 Wrapped ETH is always equal to 1 ETH. The asset has an uncapped supply but has inflation control or burn mechanisms in place.',
        ],
        volatilityRating: "D",
        volatilityDescription: [
            "WETH is highly correlated to the overall market.",
        ],
    },
    {
        id: 3,
        name: "Ether",
        symbol: "ETH",
        strengthRating: "A",
        strengthDescription: [
            "ETH is a large-cap asset that represents the blockchain's native currency or monetary fee used to execute transactions on the network. The asset has an uncapped supply but has inflation control or burn mechanisms in place.",
        ],
        volatilityRating: "D",
        volatilityDescription: [
            "ETH is highly correlated to the overall market.",
        ],
    },
    {
        id: 4,
        name: "Matic",
        symbol: "MATIC",
        strengthRating: "A",
        strengthDescription: [
            "MATIC is a mid-cap asset that represents the blockchain's native currency or monetary fee used to execute transactions on the network. The asset has a fixed supply.",
        ],
        volatilityRating: "D",
        volatilityDescription: [
            "MATIC is highly correlated to the overall market.",
        ],
    },
];

const blockchainData: Prisma.BlockchainCreateInput[] = [
    {
        id: ETHEREUM_BLOCKCHAIN.blockchainId,
        name: "Ethereum",
        nativeTokenName: "Ether",
        nativeTokenSymbol: "ETH",
        imageUrl:
            "https://ethjobs.net/images/logo-eb576c2af423af6250604be82270a66f.png?vsn=d",
        designDescription: [
            "Highly decentralized with over 400k validators securing the chain, making it resilient to attacks",
            "Validator block rewards are moderately sustainable, but could compromise long-term viability",
            "Chain with highest total value invested in DeFi",
        ],
        designRating: "A",
        reliabilityRating: "A",
        reliabilityDescription: [
            "Chain had no reported downtime in the last 12 months",
        ],
        uniswapNativeTokenContract:
            "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    {
        id: ARBITRUM_BLOCKCHAIN.blockchainId,
        name: "Arbitrum",
        nativeTokenName: "Wrapped Ether",
        nativeTokenSymbol: "WETH",
        imageUrl: "https://developer.arbitrum.io/img/favicon.ico",
        designRating: "A",
        designDescription: [
            "Highly decentralized with over 600k miners securing the chain, making it resilient to censorship and attacks",
            "Validator block rewards are moderately sustainable, but could compromise long-term viability",
            "Chain ranks top 10 in total value invested",
            "Arbitrum is an Ethereum Layer 2 that makes Ethereum more scalable while building on top of Ethereum's economic security and decentralization",
        ],
        reliabilityRating: "C",
        reliabilityDescription: [
            "Chain had at least one halt in the last 12 months",
        ],
        uniswapNativeTokenContract:
            "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    },
    {
        id: POLYGON_BLOCKCHAIN.blockchainId,
        name: "Polygon",
        nativeTokenName: "Matic",
        nativeTokenSymbol: "MATIC",
        imageUrl:
            "https://seeklogo.com/images/P/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png",
        designRating: "C",
        designDescription: [
            "Centralized as only 100 validators secure the chain, with moderate likelihood of censorship or attacks",
            "Validator block rewards are unsustainable, compromising long-term viability",
            "Chain ranks top 10 in total value invested",
            "Polygon is an Ethereum side-chain, meaning it posts data to the Ethereum chain but relies on its own set of chain validators",
        ],
        reliabilityRating: "C",
        reliabilityDescription: [
            "Chain had at least one halt in the last 12 months",
        ],
        uniswapNativeTokenContract:
            "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    },
];

const protocolData: Prisma.ProtocolCreateInput[] = [
    {
        id: 1,
        name: "Uniswap",
        imageUrl:
            "https://s2.coinmarketcap.com/static/img/coins/200x200/7083.png",
        codeQualityRating: "A",
        codeQualityDescription: [
            "Code reviewed by several experienced auditors including Trail of Bits and ABDK",
            "Public team promotes accountability",
            "No documented protocol hacks since launch",
        ],
        collateralizationLeverageRating: "A",
        collateralizationLeverageDescription: ["No exposure to leverage"],
        designRating: "A",
        designDescription: [
            "No concerns identified",
            "Uniswap is one of the most copied protocols in DeFi as it pioneered the concept of automated market makers (AMMs), as well as the concept of concentrated liquidity (Uni V3) that lets you choose your own price range to provide liquidity",
        ],
        maturityRating: "A",
        maturityDescription: [
            "Core protocol launched in 2018; maturity over 2 years minimizes technical risk as smart contracts are amongst the most battle-tested",
            "Top 1% by total value locked reduces risk",
            "Decentralized governance increases transparency",
            "Low voting power concentration reduces risk",
        ],
    },
    {
        id: 2,
        name: "Euler",
        imageUrl: "https://avatars.githubusercontent.com/u/72935352?s=200&v=4",
        codeQualityRating: "B",
        codeQualityDescription: [
            "Code reviewed by several experienced auditors including Omniscia and Halborn",
            "Public team promotes accountability",
            "No documented protocol hacks since launch",
            "Basic controls to prevent oracle price manipulation. Euler uses Uniswap V3 Time Weighted Average Price (TWAP) as the default price oracle (more prone to manipulation) for its lending pools, but also supports Chainlink oracles (volume weighted and multiple price feeds) for certain assets",
        ],
        collateralizationLeverageRating: "B",
        collateralizationLeverageDescription: [
            "Pool is lending to borrowers with high collateral (<85% LTV or >125% minimum CR), which minimizes any losses in the event of a rapid price drop",
        ],
        designRating: "A",
        designDescription: [
            "No concerns identified",
            "Secured lending market that uses a combination of isolated and cross-collateral pools depending on the individual asset serves to reduce risk",
        ],
        maturityRating: "C",
        maturityDescription: [
            "Core protocol launched in 2021; maturity less than a year increases technical risk as smart contracts are less battle-tested",
            "Top 5% by total value locked reduces risk",
            "Decentralized governance increases transparency",
            "Low voting power concentration reduces risk",
        ],
    },
    {
        id: 3,
        name: "Aave Lending",
        imageUrl:
            "https://s2.coinmarketcap.com/static/img/coins/200x200/7278.png",
        codeQualityRating: "A",
        codeQualityDescription: [
            "Code reviewed by several experienced auditors including OpenZeppelin, Trail of Bits and PeckShield",
            "Public team promotes accountability",
            "No documented protocol hacks since launch",
            "Robust controls to mitigate oracle price manipulation",
        ],
        collateralizationLeverageRating: "A",
        collateralizationLeverageDescription: ["No exposure to leverage"],
        designRating: "A",
        designDescription: [
            "No concerns identified",
            "Secured lending market that uses a combination of isolated and cross-collateral pools depending on the individual asset serves to reduce risk",
            "Aave is one of the largest and oldest DeFi protocols that is well-trusted by DeFi investors",
        ],
        maturityRating: "A",
        maturityDescription: [
            "Core protocol launched in 2020; maturity over 2 years minimizes technical risk as smart contracts are amongst the most battle-tested",
            "Top 1% by total value locked reduces risk",
            "Decentralized governance increases transparency",
            "Low voting power concentration reduces risk",
        ],
    },
];

const poolData: Prisma.PoolCreateInput[] = [
    {
        name: "Uniswap USDC-ETH Market Making 0.05%",
        token0: { connect: { id: 1 } },
        token1: { connect: { id: 3 } },
        description:
            "This pool facilitates trades between ETH and USDC. Your yield is generated from swap fees paid by traders when an exchange happens.",
        address: "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640",
        blockchain: { connect: { id: ETHEREUM_BLOCKCHAIN.blockchainId } },
        overallRiskRating: "A",
        fundamentalsRiskRating: "A",
        economicsRiskRating: "C",
        factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
        fee: 500,
        impermanentLossRating: "D",
        impermanentLossDescription: [
            "Significant impermanent loss expected as assets in the pool have minimal correlation and are at greater risk of price divergence.",
        ],
        protocol: { connect: { id: 1 } },
        tickSpacing: 60,
        token0Address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        token1Address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        yieldOutlookRating: "A",
        yieldOutlookDescription: [
            "Highly sustainable pool as yield is purely organic and based on market supply and demand",
            "Very high TVL at over $100M, which means your yield is barely impacted by incremental deposits into the pool",
        ],
        defiLlamaId: "665dc8bc-c79d-4800-97f7-304bf368e547",
    },
    {
        name: "Uniswap USDC-WETH Market Making 0.05%",
        description:
            "This pool facilitates trades between USDC and ETH. Your yield is generated from swap fees paid by traders when an exchange happens.",
        token0: { connect: { id: 1 } },
        token1: { connect: { id: 2 } },
        address: "0x45dda9cb7c25131df268515131f647d726f50608",
        blockchain: { connect: { id: POLYGON_BLOCKCHAIN.blockchainId } },
        protocol: { connect: { id: 1 } },
        factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
        token0Address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        token1Address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        fee: 500,
        tickSpacing: 10,
        overallRiskRating: "B",
        fundamentalsRiskRating: "B",
        economicsRiskRating: "C",
        impermanentLossRating: "D",
        impermanentLossDescription: [
            "Underlying assets have no correlation and assets in the pool will likely experience price divergence; impermanent loss (IL) expected if there is price divergence between underlying assets.",
        ],
        yieldOutlookRating: "B",
        yieldOutlookDescription: [
            "Yield outlook is stable to positive as pool earnings are generated from organic user demand of protocol services",
            "Moderate TVL means your yield declines slightly for incremental deposits into the pool",
        ],
        defiLlamaId: "7755b02a-ba25-4025-85c7-77908d78c486",
    },
    {
        name: "Uniswap MATIC-WETH Market Making 0.3%",
        token0: { connect: { id: 4 } },
        token1: { connect: { id: 2 } },
        description:
            "This pool facilitates trades between MATIC and ETH. Your yield is generated from swap fees paid by traders when an exchange happens.",
        address: "0x167384319b41f7094e62f7506409eb38079abff8",
        blockchain: { connect: { id: POLYGON_BLOCKCHAIN.blockchainId } },
        protocol: { connect: { id: 1 } },
        factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
        token0Address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
        token1Address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        fee: 3000,
        tickSpacing: 60,
        overallRiskRating: "B",
        fundamentalsRiskRating: "B",
        economicsRiskRating: "C",
        impermanentLossRating: "C",
        impermanentLossDescription: [
            "Moderate impermanent loss expected as assets in the pool are moderately correlated and at risk of price divergence.",
        ],
        yieldOutlookRating: "B",
        yieldOutlookDescription: [
            "Yield outlook is stable to positive as pool earnings are generated from organic user demand of protocol services",
            "Moderate TVL means your yield declines slightly for incremental deposits into the pool",
        ],
        defiLlamaId: "d8ce4c9a-f1cf-4792-ad78-b5446d06a650",
    },
    {
        name: "Uniswap ETH-USDC Market Making 0.3%",
        token0: { connect: { id: 3 } },
        token1: { connect: { id: 1 } },
        description:
            "This pool facilitates trades between ETH and USDC. Your yield is generated from swap fees paid by traders when an exchange happens.",
        address: "0x17c14d2c404d167802b16c450d3c99f88f2c4f4d",
        blockchain: { connect: { id: ARBITRUM_BLOCKCHAIN.blockchainId } },
        factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
        fee: 3000,
        protocol: { connect: { id: 1 } },
        tickSpacing: 60,
        token0Address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        token1Address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
        overallRiskRating: "B",
        fundamentalsRiskRating: "B",
        economicsRiskRating: "C",
        yieldOutlookRating: "B",
        yieldOutlookDescription: [
            "Yield outlook is stable to positive as pool earnings are generated from organic user demand of protocol services",
            "Moderate TVL means your yield declines slightly for incremental deposits into the pool",
        ],
        impermanentLossRating: "D",
        impermanentLossDescription: [
            "Underlying assets have no correlation and assets in the pool will likely experience price divergence; impermanent loss (IL) expected if there is price divergence between underlying assets.",
        ],
        defiLlamaId: "d8f13b99-3eb8-436f-97d6-882ea1eff8f4",
    },
];

async function main() {
    console.log("Start seeding database...");
    // Tokens
    for (const t of tokenData) {
        try {
            const token = await prisma.token.create({ data: t });
            console.log(`Created token: ${token.id} ${token.symbol}`);
        } catch (err) {
            console.log(err);
        }
    }
    // Blockchains
    for (const b of blockchainData) {
        try {
            const blockchain = await prisma.blockchain.create({ data: b });

            console.log(
                `Created blockchain: ${blockchain.id} ${blockchain.name}`
            );
        } catch (err) {
            console.log(err);
        }
    }
    // Protocols
    for (const p of protocolData) {
        try {
            const protocol = await prisma.protocol.create({ data: p });
            console.log(`Created protocol: ${protocol.id} ${protocol.name}`);
        } catch (err) {
            console.log(err);
        }
    }
    // Pools
    for (const p of poolData) {
        try {
            const pool = await prisma.pool.create({ data: p });
            console.log(`Created pool: ${pool.id} ${pool.name}`);
        } catch (err) {
            console.log(err);
        }
    }
}

main()
    .then(async () => {
        console.log("Seeded successfully.");
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error("Seed exited with error.");
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
