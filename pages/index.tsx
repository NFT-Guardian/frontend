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

type TokenBalanceUsdPrice = {
  token: Token;
  usdPrice: number;
  balance: bigint;
};

type ErrorType = {
  message: string;
} | null;

function useFetch(url: string, ...depenceArgs: any[]) {
  const [data, setData] = useState<TokenBalanceUsdPrice[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    fetch(url)
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
  }, depenceArgs);

  return { data, loading, error };
}

const Home: NextPage = () => {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const chainName = chain?.name.toLocaleLowerCase() || ''
  const { data, loading, error }: { data: TokenBalanceUsdPrice[] | null, loading: boolean, error: ErrorType } = useFetch(`/api/tokenBalances?chain=${chainName}&address=${address || DEFAULT_ADDRESS}`);

  const tokenBlock = (tokenBalance: TokenBalanceUsdPrice): JSX.Element => {
    const { token, balance, usdPrice } = tokenBalance;
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
                {usdPrice.toFixed(2)}
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

  const displayFetchComponents = () => {
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
          No data to display
        </Typography>
      </Paper>
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
        {displayFetchComponents()}
        {(!chain) && (
          <Box display="flex" justifyContent="center" alignItems="center" height="10vh">
            <Typography variant="subtitle1" color="textSecondary">
              Connect to a wallet to see token balances
            </Typography>
          </Box>
        )}
        {(data?.length && chain) && (
          data.map(tokenBlock)
        )}
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
