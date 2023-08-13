import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Button, Container, Avatar, Typography, Paper, CircularProgress, Divider, Card, CardContent } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import styles from '../styles/Home.module.css';
import { Token } from '../utils/Types';
import { formatUnits } from 'viem'

const DEFAULT_ADDRESS = '0x0000000000000000000000000000000000000000';

type TokenBalance = {
  token: Token,
  balance: bigint;
};

type ErrorType = {
  message: string;
} | null;

function useFetchData(chain: string, address: `0x${string}`) {
  const [data, setData] = useState<TokenBalance[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    if (!chain || !address) return;
    fetch(`/api/tokenBalances?chain=${chain}&address=${address}`)
      .then(async response => {
        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        setError({ message: error.message });
        setLoading(false);
      });
  }, [chain, address]);

  return { data, loading, error };
}

const Home: NextPage = () => {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { disconnect } = useDisconnect()
  const { data, loading, error }: { data: TokenBalance[] | null, loading: boolean, error: ErrorType } = useFetchData(chain?.name.toLocaleLowerCase() || '', address || DEFAULT_ADDRESS);

  const tokenBlock = (tokenBalance: TokenBalance): JSX.Element => {
    const { token, balance } = tokenBalance;
    const formatedBalance = formatUnits(balance, token.decimals);
    const roundedBalance = parseFloat(formatedBalance).toFixed(2);
    return (
      <Card sx={{ width: 'fit-content'}} elevation={3}>
        <Box padding={2}>
          <Typography variant="subtitle1" color="textPrimary">
            {token.name}
          </Typography>
          <Avatar src={token.logoURI} sx={{margin: 'auto', width: '70%', height: '70%'}}/>
        </Box>
        <Divider />
        <Box display={"flex"}>
          <Box display={"flex"} flexDirection="column" padding={2} textAlign={"center"}>
            <Typography variant="subtitle2" color="textSecondary">
              Balance
            </Typography>
            <Box display={"flex"} alignItems={"flex-end"} fontFamily={"serif"}>
              <Typography variant="h4" fontStyle={'blod'} color="textPrimary">
                {roundedBalance}
              </Typography>
              <Typography variant="subtitle2" color="textPrimary">
                {token.symbol}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ width: '40px', transform: 'rotate(90deg)', margin: 'auto'}} />
          <Box display={"flex"} flexDirection="column" padding={2} textAlign={"center"}>
            <Typography variant="subtitle2" color="textSecondary">
              Actual Price
            </Typography>
            <Box display={"flex"} alignItems={"flex-end"} fontFamily={"serif"}>
              <Typography variant="h4" fontStyle={'blod'} color="textPrimary">
                1804
                {/* TODO: Query the price */}
              </Typography>
              <Typography variant="subtitle2" color="textPrimary">
                $
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    )
  }

  const displayContent = () => {
    if (!chain) return (
      <Box display="flex" justifyContent="center" alignItems="center" height="10vh">
        <Typography variant="subtitle1" color="textSecondary">
          Connect to a wallet to see token balances
        </Typography>
      </Box>
    );
    if (loading) return (
      <Box display="flex" justifyContent="center" alignItems="center" height="10vh">
        <CircularProgress />
      </Box>
    );

    if (error) return (
      <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
        <Typography color="error" variant="h6">
          Error: {error.message}
        </Typography>
      </Paper>
    );

    if (data?.length === 0) return (
      <Paper elevation={2} style={{ padding: '16px', margin: '16px' }}>
        <Typography variant="subtitle1" color="textSecondary">
          No supported token on this chain
        </Typography>
      </Paper>
    );

    if (data?.length) return (
      data.map(tokenBlock)
    );
  };

  return (
    <div>
      <Head>
        <title>Crypto Guardian</title>
        <meta
          content="Guard your crypto with Crypto Guardian"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>

      <Box component="header" sx={{ width: '100%', height: '15vh', backgroundColor: 'primary.main', position: 'relative' }}>
        <img src="" alt="" style={{}} />
        <Avatar sx={{ width: '80px', height: '80px', position: 'absolute', left: '10px', bottom: '-40px' }} alt="avatar image" src="">{'0x' || address}</Avatar>
        {/* {data} */}
      </Box>
      <Container maxWidth="lg" sx={{ my: '50px' }}>
        <ConnectButton />
      </Container>

      <Box padding={2}>
        {displayContent()}
      </Box>

      <footer className={styles.footer}>
        <a href="#" rel="noopener noreferrer">
          Made with ❤️
        </a>
      </footer>
    </div>
  );
};

export default Home;
