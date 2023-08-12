import { NextApiRequest, NextApiResponse } from 'next';
import TokenList from '../../utils/tokenList';
import ChainList from '../../utils/chainList';

interface QueryType {
    chain: string;
    address: string;
    [key: string]: any;
}

const key = {
    etherscan: process.env.ETHERSCAN_KEY,
    optimism: '0000',
    base: '0000',
}

async function getSingleTokenBalance(chain: string, address: string, tokenAddress: string) {
    switch (chain) {
        case 'ethereum':
            const balance = await getSingleTokenBalanceEth(chain, address, tokenAddress);
            return balance;
        // case 'optimism':
        //     return getSingleTokenBalanceOp(chain, address, tokenAddress);
        // case 'base':
        //     return getSingleTokenBalanceBase(chain, address, tokenAddress);
        default:
            throw new Error('Invalid chain');
    }
}

async function getAllTokenBalances(chain: string, address: string) {
    const tokens = TokenList.getSupportedTokens(chain);
    const results = await Promise.all(tokens.map(async (token) => {
        const balance = await getSingleTokenBalance(chain, address, token.address);
        if (balance > 0) {
            return ({ token: token, balance: balance });
        }
    }));
    const values = results.filter(Boolean);
    return values;
}

async function getSingleTokenBalanceEth(chain: string, address: string, tokenAddress: string) {
    const url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${address}&tag=latest&apikey=${key.etherscan}`;
    try {
        const response = await fetch(url)
        const data = await response.json();
        if (data.status === '1') {
            return data.result;
        } else {
            throw new Error('Error fetching token balances');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching token balances');
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

    getAllTokenBalances(chain, address).then((values) => {
        res.status(200).json(values);
    })
}
