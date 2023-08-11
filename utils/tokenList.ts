// supported tokens on uniswap (by https://tokenlists.org) : https://gateway.ipfs.io/ipns/tokens.uniswap.org

import ChainList from "./chainList";

interface Token {
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
            }
        }
    }
}

export default class TokenList {

    static getSupportedTokens = (chainIdentifier: string | number) => {
        if (typeof chainIdentifier === 'string') {
            return this.getSupportedTokensByChainSlug(chainIdentifier);
        } else if (typeof chainIdentifier === 'number') {
            return this.getSupportedTokensByChainId(chainIdentifier);
        }
        return [];
    }

    static getSupportedTokensByChainId = (chainId: number) => {
        if (ChainList.isSupportedChain(chainId) === false) {
            throw new Error('Invalid chain id');
        }
        return this.supportedTokens.filter(token => token.chainId === chainId);
    }

    static getSupportedTokensByChainSlug = (chainSlug: string) => {
        if (ChainList.isSupportedChain(chainSlug) === false) {
            throw new Error('Invalid chain slug');
        }
        return this.getSupportedTokensByChainId(ChainList.getChainId(chainSlug));
    }

    static supportedTokens: Token[] = [
        // ETHEREUM
        {
            "name": "USDCoin",
            "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            "symbol": "USDC",
            "decimals": 6,
            "chainId": 1,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
            "extensions": {
                "bridgeInfo": {
                    "10": {
                        "tokenAddress": "0x7F5c764cBc14f9669B88837ca1490cCa17c31607"
                    },
                    "56": {
                        "tokenAddress": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"
                    },
                    "137": {
                        "tokenAddress": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
                    },
                    "8453": {
                        "tokenAddress": "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA"
                    },
                    "42161": {
                        "tokenAddress": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"
                    },
                    "43114": {
                        "tokenAddress": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"
                    },
                    "84531": {
                        "tokenAddress": "0x853154e2A5604E5C74a2546E2871Ad44932eB92C"
                    }
                }
            }
        },
        {
            "name": "Tether USD",
            "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            "symbol": "USDT",
            "decimals": 6,
            "chainId": 1,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
            "extensions": {
                "bridgeInfo": {
                    "10": {
                        "tokenAddress": "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58"
                    },
                    "56": {
                        "tokenAddress": "0x55d398326f99059fF775485246999027B3197955"
                    },
                    "137": {
                        "tokenAddress": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
                    },
                    "42161": {
                        "tokenAddress": "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"
                    },
                    "43114": {
                        "tokenAddress": "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7"
                    }
                }
            }
        },
        // POLYGON
        {
            "chainId": 137,
            "address": "0x0000000000000000000000000000000000001010",
            "name": "Polygon",
            "symbol": "MATIC",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912",
            "extensions": {
                "bridgeInfo": {
                    "1": {
                        "tokenAddress": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"
                    }
                }
            }
        },
        {
            "name": "Tether USD",
            "address": "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
            "symbol": "USDT",
            "decimals": 6,
            "chainId": 137,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
            "extensions": {
                "bridgeInfo": {
                    "1": {
                        "tokenAddress": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
                    }
                }
            }
        },
        {
            "name": "USDCoin",
            "address": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
            "symbol": "USDC",
            "decimals": 6,
            "chainId": 137,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
            "extensions": {
                "bridgeInfo": {
                    "1": {
                        "tokenAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
                    }
                }
            }
        },
        // BASE
        {
            "name": "Balancer",
            "address": "0x7c6b91D9Be155A6Db01f749217d76fF02A7227F2",
            "symbol": "BAL",
            "decimals": 18,
            "chainId": 8453,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xba100000625a3754423978a60c9317c58a424e3D/logo.png",
            "extensions": {
                "bridgeInfo": {
                    "1": {
                        "tokenAddress": "0xba100000625a3754423978a60c9317c58a424e3D"
                    }
                }
            }
        },
        {
            "chainId": 8453,
            "address": "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
            "name": "Coinbase Wrapped Staked ETH",
            "symbol": "cbETH",
            "decimals": 18,
            "logoURI": "https://ethereum-optimism.github.io/data/cbETH/logo.svg",
            "extensions": {
                "bridgeInfo": {
                    "1": {
                        "tokenAddress": "0xBe9895146f7AF43049ca1c1AE358B0541Ea49704"
                    }
                }
            }
        },
        {
            "name": "Compound",
            "address": "0x9e1028F5F1D5eDE59748FFceE5532509976840E0",
            "symbol": "COMP",
            "decimals": 18,
            "chainId": 8453,
            "logoURI": "https://ethereum-optimism.github.io/data/COMP/logo.svg",
            "extensions": {
                "bridgeInfo": {
                    "1": {
                        "tokenAddress": "0xc00e94Cb662C3520282E6f5717214004A7f26888"
                    }
                }
            }
        },
        {
            "name": "Dai Stablecoin",
            "address": "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
            "symbol": "DAI",
            "decimals": 18,
            "chainId": 8453,
            "logoURI": "https://ethereum-optimism.github.io/data/DAI/logo.svg",
            "extensions": {
                "bridgeInfo": {
                    "1": {
                        "tokenAddress": "0x6B175474E89094C44Da98b954EedeAC495271d0F"
                    }
                }
            }
        },
        {
            "chainId": 8453,
            "address": "0xD08a2917653d4E460893203471f0000826fb4034",
            "name": "Harvest Finance",
            "symbol": "FARM",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/12304/thumb/Harvest.png?1613016180",
            "extensions": {
                "bridgeInfo": {
                    "1": {
                        "tokenAddress": "0xa0246c9032bC3A600820415aE600c6388619A14D"
                    }
                }
            }
        },
        {
            "name": "USD Base Coin",
            "address": "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
            "symbol": "USDbC",
            "decimals": 6,
            "chainId": 8453,
            "logoURI": "https://ethereum-optimism.github.io/data/USDC/logo.png",
            "extensions": {
                "bridgeInfo": {
                    "1": {
                        "tokenAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
                    }
                }
            }
        },
        {
            "name": "Wrapped Ether",
            "address": "0x4200000000000000000000000000000000000006",
            "symbol": "WETH",
            "decimals": 18,
            "chainId": 8453,
            "logoURI": "https://ethereum-optimism.github.io/data/WETH/logo.png",
            "extensions": {
                "bridgeInfo": {
                    "1": {
                        "tokenAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
                    }
                }
            }
        },
        {
            "name": "0x Protocol Token",
            "address": "0x3bB4445D30AC020a84c1b5A8A2C6248ebC9779D0",
            "symbol": "ZRX",
            "decimals": 18,
            "chainId": 8453,
            "logoURI": "https://ethereum-optimism.github.io/data/ZRX/logo.png",
            "extensions": {
                "bridgeInfo": {
                    "1": {
                        "tokenAddress": "0xE41d2489571d322189246DaFA5ebDe1F4699F498"
                    }
                }
            }
        },
        // BASE GOERLI
        {
            "chainId": 84531,
            "address": "0x4fC531f8Ae7A7808E0dccCA08F1e3c7694582950",
            "name": "Coinbase Wrapped Staked ETH",
            "symbol": "cbETH",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/27008/large/cbeth.png",
            "extensions": {
                "bridgeInfo": {
                    "1": {
                        "tokenAddress": "0xBe9895146f7AF43049ca1c1AE358B0541Ea49704"
                    }
                }
            }
        },
        {
            "name": "Compound",
            "address": "0xA29b548056c3fD0f68BAd9d4829EC4E66f22f796",
            "symbol": "COMP",
            "decimals": 18,
            "chainId": 84531,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png",
            "extensions": {
                "bridgeInfo": {
                    "1": {
                        "tokenAddress": "0xc00e94Cb662C3520282E6f5717214004A7f26888"
                    }
                }
            }
        },
        {
            "name": "Dai Stablecoin",
            "address": "0x174956bDfbCEb6e53089297cce4fE2825E58d92C",
            "symbol": "DAI",
            "decimals": 18,
            "chainId": 84531,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
            "extensions": {
                "bridgeInfo": {
                    "1": {
                        "tokenAddress": "0x6B175474E89094C44Da98b954EedeAC495271d0F"
                    }
                }
            }
        },
        {
            "name": "USDCoin",
            "address": "0x853154e2A5604E5C74a2546E2871Ad44932eB92C",
            "symbol": "USDC",
            "decimals": 6,
            "chainId": 84531,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
            "extensions": {
                "bridgeInfo": {
                    "1": {
                        "tokenAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
                    }
                }
            }
        },
        {
            "name": "Wrapped Ether",
            "address": "0x4200000000000000000000000000000000000006",
            "symbol": "WETH",
            "decimals": 18,
            "chainId": 84531,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
            "extensions": {
                "bridgeInfo": {
                    "1": {
                        "tokenAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
                    }
                }
            }
        },
        // OPTIMISM

        {
            "chainId": 10,
            "address": "0x4200000000000000000000000000000000000042",
            "name": "Optimism",
            "symbol": "OP",
            "decimals": 18,
            "logoURI": "https://ethereum-optimism.github.io/data/OP/logo.png"
        },
        {
            "chainId": 10,
            "address": "0x76FB31fb4af56892A25e32cFC43De717950c9278",
            "name": "Aave",
            "symbol": "AAVE",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"
                }
              }
            }
          },
          {
            "name": "Balancer",
            "address": "0xFE8B128bA8C78aabC59d4c64cEE7fF28e9379921",
            "symbol": "BAL",
            "decimals": 18,
            "chainId": 10,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xba100000625a3754423978a60c9317c58a424e3D/logo.png",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xba100000625a3754423978a60c9317c58a424e3D"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0x3e7eF8f50246f725885102E8238CBba33F276747",
            "name": "BarnBridge",
            "symbol": "BOND",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/12811/thumb/barnbridge.jpg?1602728853",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x0391D2021f89DC339F60Fff84546EA23E337750f"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0x9C9e5fD8bbc25984B178FdCE6117Defa39d2db39",
            "name": "Binance USD",
            "symbol": "BUSD",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/9576/thumb/BUSD.png?1568947766",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x4Fabb145d64652a948d72533023f6E7A623C7C53"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0xadDb6A0412DE1BA0F936DCaeb8Aaa24578dcF3B2",
            "name": "Coinbase Wrapped Staked ETH",
            "symbol": "cbETH",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/27008/large/cbeth.png",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xBe9895146f7AF43049ca1c1AE358B0541Ea49704"
                }
              }
            }
          },
          {
            "name": "Curve DAO Token",
            "address": "0x0994206dfE8De6Ec6920FF4D779B0d950605Fb53",
            "symbol": "CRV",
            "decimals": 18,
            "chainId": 10,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xD533a949740bb3306d119CC777fa900bA034cd52/logo.png",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xD533a949740bb3306d119CC777fa900bA034cd52"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0xEc6adef5E1006bb305bB1975333e8fc4071295bf",
            "name": "Cartesi",
            "symbol": "CTSI",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/11038/thumb/cartesi.png?1592288021",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x491604c0FDF08347Dd1fa4Ee062a822A5DD06B5D"
                }
              }
            }
          },
          {
            "name": "Dai Stablecoin",
            "address": "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
            "symbol": "DAI",
            "decimals": 18,
            "chainId": 10,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x6B175474E89094C44Da98b954EedeAC495271d0F"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0x65559aA14915a70190438eF90104769e5E890A00",
            "name": "Ethereum Name Service",
            "symbol": "ENS",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/19785/thumb/acatxTm8_400x400.jpg?1635850140",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0xD8737CA46aa6285dE7B8777a8e3db232911baD41",
            "name": "Stafi",
            "symbol": "FIS",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/12423/thumb/stafi_logo.jpg?1599730991",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xef3A930e1FfFFAcd2fc13434aC81bD278B0ecC8d"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0xF1a0DA3367BC7aa04F8D94BA57B862ff37CeD174",
            "name": "ShapeShift FOX Token",
            "symbol": "FOX",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/9988/thumb/FOX.png?1574330622",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xc770EEfAd204B5180dF6a14Ee197D99d808ee52d"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0x2E3D870790dC77A83DD1d18184Acc7439A53f475",
            "name": "Frax",
            "symbol": "FRAX",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/13422/thumb/frax_logo.png?1608476506",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x853d955aCEf822Db058eb8505911ED77F175b99e"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0x67CCEA5bb16181E7b4109c9c2143c24a1c2205Be",
            "name": "Frax Share",
            "symbol": "FXS",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/13423/thumb/frax_share.png?1608478989",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0x1EBA7a6a72c894026Cd654AC5CDCF83A46445B08",
            "name": "Gitcoin",
            "symbol": "GTC",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/15810/thumb/gitcoin.png?1621992929",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xDe30da39c46104798bB5aA3fe8B9e0e1F348163F"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0x589d35656641d6aB57A545F08cf473eCD9B6D5F7",
            "name": "GYEN",
            "symbol": "GYEN",
            "decimals": 6,
            "logoURI": "https://assets.coingecko.com/coins/images/14191/thumb/icon_gyen_200_200.png?1614843343",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xC08512927D12348F6620a698105e1BAac6EcD911"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0xFdb794692724153d1488CcdBE0C56c252596735F",
            "name": "Lido DAO",
            "symbol": "LDO",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/13573/thumb/Lido_DAO.png?1609873644",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32"
                }
              }
            }
          },
          {
            "name": "ChainLink Token",
            "address": "0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6",
            "symbol": "LINK",
            "decimals": 18,
            "chainId": 10,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x514910771AF9Ca656af840dff83E8264EcF986CA"
                }
              }
            }
          },
          {
            "name": "LoopringCoin V2",
            "address": "0xFEaA9194F9F8c1B65429E31341a103071464907E",
            "symbol": "LRC",
            "decimals": 18,
            "chainId": 10,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD/logo.png",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD"
                }
              }
            }
          },
          {
            "chainId": 10,
            "name": "Liquity USD",
            "symbol": "LUSD",
            "logoURI": "https://assets.coingecko.com/coins/images/14666/thumb/Group_3.png?1617631327",
            "address": "0xc40F949F8a4e094D1b49a23ea9241D289B7b2819",
            "decimals": 18,
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0x3390108E913824B8eaD638444cc52B9aBdF63798",
            "name": "Mask Network",
            "symbol": "MASK",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/14051/thumb/Mask_Network.jpg?1614050316",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x69af81e73A73B40adF4f3d4223Cd9b1ECE623074"
                }
              }
            }
          },
          {
            "name": "Maker",
            "address": "0xab7bAdEF82E9Fe11f6f33f87BC9bC2AA27F2fCB5",
            "symbol": "MKR",
            "decimals": 18,
            "chainId": 10,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0xC1c167CC44f7923cd0062c4370Df962f9DDB16f5",
            "name": "Pepe",
            "symbol": "PEPE",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1682922725",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x6982508145454Ce325dDbE47a25d4ec3d2311933"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0x9e1028F5F1D5eDE59748FFceE5532509976840E0",
            "name": "Perpetual Protocol",
            "symbol": "PERP",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/12381/thumb/60d18e06844a844ad75901a9_mark_only_03.png?1628674771",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xbC396689893D065F41bc2C6EcbeE5e0085233447"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0x7FB688CCf682d58f86D7e38e03f9D22e7705448B",
            "name": "Rai Reflex Index",
            "symbol": "RAI",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/14004/thumb/RAI-logo-coin.png?1613592334",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x03ab458634910AaD20eF5f1C8ee96F1D6ac54919"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0xB548f63D4405466B36C0c0aC3318a22fDcec711a",
            "name": "Rari Governance Token",
            "symbol": "RGT",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/12900/thumb/Rari_Logo_Transparent.png?1613978014",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xD291E7a03283640FDc51b121aC401383A46cC623"
                }
              }
            }
          },
          {
            "name": "Synthetix Network Token",
            "address": "0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4",
            "symbol": "SNX",
            "decimals": 18,
            "chainId": 10,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0xba1Cf949c382A32a09A17B2AdF3587fc7fA664f1",
            "name": "SOL Wormhole ",
            "symbol": "SOL",
            "decimals": 9,
            "logoURI": "https://assets.coingecko.com/coins/images/22876/thumb/SOL_wh_small.png?1644224316",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xD31a59c85aE9D8edEFeC411D448f90841571b89c"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0xEf6301DA234fC7b0545c6E877D3359FE0B9E50a4",
            "name": "SUKU",
            "symbol": "SUKU",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/11969/thumb/UmfW5S6f_400x400.jpg?1596602238",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x0763fdCCF1aE541A5961815C0872A8c5Bc6DE4d7"
                }
              }
            }
          },
          {
            "name": "Synth sUSD",
            "address": "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9",
            "symbol": "sUSD",
            "decimals": 18,
            "chainId": 10,
            "logoURI": "https://assets.coingecko.com/coins/images/5013/thumb/sUSD.png?1616150765",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x57Ab1ec28D129707052df4dF418D58a2D46d5f51"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0x3eaEb77b03dBc0F6321AE1b72b2E9aDb0F60112B",
            "name": "Sushi",
            "symbol": "SUSHI",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/12271/thumb/512x512_Logo_no_chop.png?1606986688",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2"
                }
              }
            }
          },
          {
            "chainId": 10,
            "name": "Threshold Network",
            "symbol": "T",
            "logoURI": "https://assets.coingecko.com/coins/images/22228/thumb/nFPNiSbL_400x400.jpg?1641220340",
            "address": "0x747e42Eb0591547a0ab429B3627816208c734EA7",
            "decimals": 18,
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xCdF7028ceAB81fA0C6971208e83fa7872994beE5"
                }
              }
            }
          },
          {
            "chainId": 10,
            "address": "0xaf8cA653Fa2772d58f4368B0a71980e9E3cEB888",
            "name": "Tellor",
            "symbol": "TRB",
            "decimals": 18,
            "logoURI": "https://assets.coingecko.com/coins/images/9644/thumb/Blk_icon_current.png?1584980686",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x88dF592F8eb5D7Bd38bFeF7dEb0fBc02cf3778a0"
                }
              }
            }
          },
          {
            "name": "UMA Voting Token v1",
            "address": "0xE7798f023fC62146e8Aa1b36Da45fb70855a77Ea",
            "symbol": "UMA",
            "decimals": 18,
            "chainId": 10,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828/logo.png",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828"
                }
              }
            }
          },
          {
            "name": "Uniswap",
            "address": "0x6fd9d7AD17242c41f7131d257212c54A0e816691",
            "symbol": "UNI",
            "decimals": 18,
            "chainId": 10,
            "logoURI": "ipfs://QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
                }
              }
            }
          },
          {
            "name": "USDCoin",
            "address": "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
            "symbol": "USDC",
            "decimals": 6,
            "chainId": 10,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
                }
              }
            }
          },
          {
            "name": "Tether USD",
            "address": "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
            "symbol": "USDT",
            "decimals": 6,
            "chainId": 10,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
                }
              }
            }
          },
          {
            "name": "Wrapped BTC",
            "address": "0x68f180fcCe6836688e9084f035309E29Bf0A2095",
            "symbol": "WBTC",
            "decimals": 8,
            "chainId": 10,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
                }
              }
            }
          },
          {
            "name": "Wrapped Ether",
            "address": "0x4200000000000000000000000000000000000006",
            "symbol": "WETH",
            "decimals": 18,
            "chainId": 10,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
                }
              }
            }
          },
          {
            "chainId": 10,
            "name": "WOO Network",
            "symbol": "WOO",
            "logoURI": "https://assets.coingecko.com/coins/images/12921/thumb/w2UiemF__400x400.jpg?1603670367",
            "address": "0x871f2F2ff935FD1eD867842FF2a7bfD051A5E527",
            "decimals": 18,
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0x4691937a7508860F876c9c0a2a617E7d9E945D4B"
                }
              }
            }
          },
          {
            "name": "0x Protocol Token",
            "address": "0xD1917629B3E6A72E6772Aab5dBe58Eb7FA3C2F33",
            "symbol": "ZRX",
            "decimals": 18,
            "chainId": 10,
            "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xE41d2489571d322189246DaFA5ebDe1F4699F498/logo.png",
            "extensions": {
              "bridgeInfo": {
                "1": {
                  "tokenAddress": "0xE41d2489571d322189246DaFA5ebDe1F4699F498"
                }
              }
            }
          },
    ]
}
