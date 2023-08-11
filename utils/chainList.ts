// chain id by https://chainlist.org/

interface Chain {
    chainId: number;
    name: string;
    slug: string;
}

export default class ChainList {
    
    static isSupportedChain(chainIdentifier: string | number): boolean {
        if (typeof chainIdentifier === 'string') {
            return !!this.supportedChains.find(chain => chain.slug === chainIdentifier);
        } else if (typeof chainIdentifier === 'number') {
            return !!this.supportedChains.find(chain => chain.chainId === chainIdentifier);
        }
        return false;
    }

    static getChainId = (chainSlug: string): number => {
        return this.supportedChains.find(chain => chain.slug === chainSlug)?.chainId || 0;
    }

    static supportedChains: Chain[] = [
        {
            "chainId": 1,
            "name": "Ethereum",
            "slug": "ethereum",
        },
        {
            "chainId": 5,
            "name": "Goerli",
            "slug": "goerli",
        },
        {
            "chainId": 10,
            "name": "Optimism",
            "slug": "optimism",
        },
        {
            "chainId": 420,
            "name": "Optimism Goerli",
            "slug": "optimismGoerli",
        },
        {
            "chainId": 137,
            "name": "Polygon",
            "slug": "polygon",
        },
        {
            "chainId": 7777777,
            "name": "Zora",
            "slug": "zora",
        },
        {
            "chainId": 8453,
            "name": "Base",
            "slug": "base",
        },
        {
            "chainId": 84531,
            "name": "Base Goerli",
            "slug": "baseGoerli",
        }
    ];
}