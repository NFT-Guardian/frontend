import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Button, Container, Avatar } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import styles from '../styles/Home.module.css';
import { Token } from '../utils/Types';

const DEFAULT_ADDRESS = '0x0000000000000000000000000000000000000000';

type DataType = {
  token: Token,
  balance: number;
};

type ErrorType = {
  message: string;
} | null;

function useFetchData(chain: string, address: `0x${string}`) {
  const [data, setData] = useState<DataType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    fetch(`/api/tokenBalances?chain=${chain}&address=${address}`)
      .then(async response => {
        if (!response.ok) {
          console.error(response);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError({ message: error.message });
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}

const Home: NextPage = () => {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { disconnect } = useDisconnect()
  const { data, loading, error }: { data: DataType[] | null, loading: boolean, error: ErrorType } = useFetchData(chain?.name.toLocaleLowerCase() || '', address || DEFAULT_ADDRESS);

  const displayContent = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (data?.length === 0) return <div>No supported token on this chain</div>;
    if (data?.length) return <div>Data: {JSON.stringify(data)}</div>;
  };

  return (
    <div>
      <Head>
        <title>RainbowKit App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
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
        {isConnected && (
          <Box sx={{ textAlign: 'center' }}>
            <p>Connected to {address}</p>
            <Button variant="contained" onClick={() => disconnect()}>Disconnect</Button>
          </Box>
        )}
      </Container>

      {displayContent()}

      <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
