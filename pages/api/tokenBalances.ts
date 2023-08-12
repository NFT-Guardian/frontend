import { NextApiRequest, NextApiResponse } from 'next';
import TokenList from '../../utils/tokenList';
import ChainList from '../../utils/chainList';

const key = {
    etherscan: process.env.ETHERSCAN_KEY,
    optimism:  '0000',
    base:  '0000',
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

    let url = null;
    switch (chain) {
        case 'optimism':
            break;
        case 'ethereum':
            url = `https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${address}&tag=latest&apikey=${key.etherscan}`;
        default:
            break;
    }

    if (url === null) {
        return res.status(400).json({ error: "Cannot build url" })
    }
    
    try {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status === '1') {
                    res.status(200).json(data.result);
                } else {
                    return res.status(400).json({ error: "Error fetching token balances" })
                }
            });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}
