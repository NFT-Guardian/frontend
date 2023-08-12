import { NextApiRequest, NextApiResponse } from 'next';
import TokenList from '../../utils/tokenList';
import ChainList from '../../utils/chainList';
import { log } from 'console';

const key = {
    etherscan: process.env.ETHERSCAN_KEY,
    optimism: '0000',
    base: '0000',
}

async function getSingleTokenBalance(chain: string, address: string, tokenAddress: string) {
    switch (chain) {
        case 'ethereum':
            const balance = await getSingleTokenBalanceEth(chain, address, tokenAddress);
            console.log('balanceeeeeee : ', balance);
            
            return balance;
        // case 'optimism':
        //     return getSingleTokenBalanceOp(chain, address, tokenAddress);
        // case 'base':
        //     return getSingleTokenBalanceBase(chain, address, tokenAddress);
        default:
            throw new Error('Invalid chain');
    }
}

async function getSingleTokenBalanceEth(chain: string, address: string, tokenAddress: string) {
    const url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${address}&tag=latest&apikey=${key.etherscan}`;
    try {
        const response = await fetch(url)
        const data = await response.json();
        console.log(data);
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

// example http://localhost:3000/api/tokenBalances?chain=ethereum&address=0x57d90b64a1a57749b0f932f1a3395792e12e7055&tokenAddress=0xe04f27eb70e025b78871a2ad7eabe85e61212761
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;
    // @ts-ignore
    let { chain, address, tokenAddress }: { chain: string, address: string, tokenAddress: string } = query;
    if (!chain) {
        return res.status(400).json({ error: "Missing chain" })
    }
    if (!address) {
        return res.status(400).json({ error: "Missing address" })
    }
    if (!tokenAddress) {
        return res.status(400).json({ error: "Missing token address" })
    }

    if (!ChainList.isSupportedChain(chain)) {
        return res.status(400).json({ error: "Chain not supported" })
    }
    if (!TokenList.getSupportedTokens(chain)) {
        res.status(400).json({ error: "Token not supported" });
    }

    // For loop on each tokens
    getSingleTokenBalance(chain, address, tokenAddress)
        .then((balance) => {
            console.log('yeaaa', balance)
            res.status(200).json(balance);
        })
        .catch((error) => {
            console.error(error);
            return res.status(400).json({ error: "Error fetching token balances" })
        })
    // endfor
}
