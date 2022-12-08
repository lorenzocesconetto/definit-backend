import axios from "axios";

// const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const ETHERSCAN_API_KEY = "KTEIWS6ZQF6C3JXYY9DTZUNFD3DMVYMCJZ";

const getTokenAbi = async (address: string) => {
    const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${ETHERSCAN_API_KEY}`;
    const res = await axios.get(url);
    const abi = JSON.parse(res.data.result);
    return abi;
};

export { getTokenAbi };
