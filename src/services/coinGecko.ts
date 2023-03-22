import { getBlockchain } from "../utils/getBlockchain";

interface IGetTokenPrice {
    address: string[] | string;
    vs_currencies?: string | string[];
    blockchainId: number;
}

const getTokenPrice = async ({
    address,
    vs_currencies = "usd",
    blockchainId,
}: IGetTokenPrice) => {
    if (Array.isArray(address)) address = address.join();
    if (Array.isArray(vs_currencies)) vs_currencies = vs_currencies.join();
    const { coinGeckoId } = getBlockchain(blockchainId);
    const baseUrl = `https://api.coingecko.com/api/v3/simple/token_price/${coinGeckoId}?contract_addresses=${address}&vs_currencies=${vs_currencies}`;
    const res = await fetch(baseUrl);
    const data = res.json();
    return data;
};

export const coinGeckoService = { getTokenPrice };
