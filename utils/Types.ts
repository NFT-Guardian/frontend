export interface Token {
    name: string;
    address: string;
    symbol: string;
    decimals: number;
    chainId: number;
    logoURI: string;
    extensions?: {
        bridgeInfo: {
            [chainId: string]: {
                tokenAddress: string;
            };
        };
    };
}
