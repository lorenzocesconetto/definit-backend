import { COVALENT_API_KEY, COVALENT_BASE_URL } from "../utils/constants";

////////////////////////////////////////////////////
// Balances
////////////////////////////////////////////////////

export interface IBalance {
    balance: number;
    contract_decimals: number;
    contract_name: string;
    contract_ticker_symbol: string;
    logo_url: string;
    quote: number;
}

export type IBalances = IBalance[] | undefined | null;

interface IGetAccountBalancesProps {
    blockchainId: number;
    address: string;
}

const getAccountBalances = async ({
    blockchainId,
    address,
}: IGetAccountBalancesProps): Promise<IBalances> => {
    const response = await fetch(
        `${COVALENT_BASE_URL}/${blockchainId}/address/${address}/balances_v2/?key=ckey_${COVALENT_API_KEY}`
    );
    const data = (await response.json()) as {
        data: { items: IBalances };
    };
    return data.data.items;
};

////////////////////////////////////////////////////
// Transactions
////////////////////////////////////////////////////

export interface ITransaction {
    block_signed_at: string;
    tx_hash: string;
    successful: boolean;
    from_address: string;
    from_address_label: string;
    to_address: string;
    to_address_label: string | null;
    value: string;
    value_quote: number;
    gas_spent: number;
    gas_price: number;
    fees_paid: string;
    gas_quote: number;
    gas_quote_rate: number;
    log_events: [];
}

export type TTransactions = ITransaction[] | undefined | null;

interface IgetAccountTransactions {
    blockchainId: number;
    address: string;
    limit: number;
    page: number;
}
const getAccountTransactions = async ({
    blockchainId,
    address,
    limit,
    page,
}: IgetAccountTransactions): Promise<TTransactions> => {
    const url = `${COVALENT_BASE_URL}/${blockchainId}/address/${address}/transactions_v2/?key=ckey_${COVALENT_API_KEY}&page-size=${limit}&page-number=${page}`;
    const response = await fetch(url);
    const data = (await response.json()) as TTransactions;
    return data;
};

const covalentService = { getAccountBalances, getAccountTransactions };

export { covalentService };
