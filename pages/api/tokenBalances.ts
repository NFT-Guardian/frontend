import { NextApiRequest, NextApiResponse } from 'next';
import TokenList from '../../utils/tokenList';
import ChainList from '../../utils/chainList';
import { Token } from '../../utils/Types';

interface QueryType {
    chain: string;
    address: string;
    [key: string]: any;
}

type TokenBalance = {
    token: Token;
    balance: bigint;
};

type TokenBalanceUsdPrice = {
    token: Token;
    usdPrice: number;
    balance: bigint;
};

const key = {
    etherscan: process.env.ETHERSCAN_KEY,
    optimism: '0000',
    base: '0000',
}

async function getSingleTokenBalance(chain: string, address: string, tokenAddress: string): Promise<bigint> {
    switch (chain) {
        case 'ethereum':
            return await getSingleTokenBalanceEth(chain, address, tokenAddress);
        case 'goerli':
            return await getSingleTokenBalanceEth(chain, address, tokenAddress);
        // case 'optimism':
        //     return getSingleTokenBalanceOp(chain, address, tokenAddress);
        // case 'base':
        //     return getSingleTokenBalanceBase(chain, address, tokenAddress);
        default:
            throw new Error('Invalid chain');
    }
}

async function getAllTokenBalancesWithPrices(chain: string, address: string): Promise<TokenBalanceUsdPrice[]> {
    try {
        const tokenBalances = await getAllTokenBalances(chain, address);
        const tokenBalancesWithPrices = await Promise.all(tokenBalances.map(async (balance) => {
            const chainName = balance.token.name.toLocaleLowerCase();
            const usdPrice = await getUsdPrice(chainName, balance.token.address);
            console.log('USDPRICE:', usdPrice);
            return { ...balance, usdPrice };
        }));
        return tokenBalancesWithPrices;
    } catch (error) {
        console.error("Error in getAllTokenBalancesWithPrices:", error);
        throw error;
    }
}


async function getAllTokenBalances(chain: string, address: string): Promise<TokenBalance[]> {
    const tokens = TokenList.getSupportedTokens(chain);
    // Query balances
    const balances = await Promise.all(tokens.map(async (token) => {
        const balance = await getSingleTokenBalance(chain, address, token.address);
        if (balance > 0) {
            return ({ token: token, balance: balance });
        } else {
            return null;
        }
    }));

    const nonZeroBalances: TokenBalance[] = balances.filter(item => item !== null) as TokenBalance[];

    // Query native token
    const nativeBalance = await getNativeTokenBalance(chain, address)
    if (nativeBalance > 0) {
        nonZeroBalances.push({
            token: {
                name: 'Eth', address: '0x0000000000000000000000000000000000000000', symbol: 'ETH', decimals: 18, chainId: 1, logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png'
            }, balance: nativeBalance
        });
    }

    return nonZeroBalances;
}

async function getUsdPrice(chainName: string, tokenAddress: string): Promise<number> {
    const url = (tokenAddress === '0x0000000000000000000000000000000000000000') ?
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        :
        `https://api.coingecko.com/api/v3/coins/${chainName}/contract/${tokenAddress}`
        ;
    const response: any = await fetchUrl(url)
    if (chainName === 'goerli' || chainName === 'eth') {
        chainName = 'ethereum';
    }
    return response[chainName]?.usd
}

async function getNativeTokenBalance(chain: string, address: string): Promise<bigint> {
    let url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${key.etherscan}`;
    if (chain === 'goerli') {
        url = `https://api-goerli.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${key.etherscan}`;
        console.log(url);
    }
    return await fetchUrl(url).then(res => res.result);
}

async function getSingleTokenBalanceEth(chain: string, address: string, tokenAddress: string): Promise<bigint> {
    let url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${address}&tag=latest&apikey=${key.etherscan}`;
    if (chain === 'goerli') {
        url = `https://api-goerli.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${address}&tag=latest&apikey=${key.etherscan}`;
    }
    return await fetchUrl(url).then(res => res.result);
}

async function fetchUrl(url: string) {
    try {
        const response = await fetch(url)
        const data = await response.json();
        if (data.status && data.status !== '1') {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching url');
    }
}

function getSingleTokenBalanceOp(chain: string, address: string, tokenAddress: string) {
    return null;
}
function getSingleTokenBalanceBase(chain: string, address: string, tokenAddress: string) {
    return null;
}

// example http://localhost:3000/api/tokenBalances?chain=ethereum&address=0x57d90b64a1a57749b0f932f1a3395792e12e7055
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;
    const { chain, address } = query as QueryType;
    if (!chain) {
        return res.status(400).json({ error: "Missing chain" })
    }
    if (!address) {
        return res.status(400).json({ error: "Missing address" })
    }
    if (!ChainList.isSupportedChain(chain)) {
        return res.status(400).json({ error: "Chain not supported" })
    }

    getAllTokenBalancesWithPrices(chain, address).then((values) => {
        res.status(200).json(values);
    })
}
