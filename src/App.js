import React, { useCallback, useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useQuery } from "@apollo/react-hooks";
import Web3 from "web3";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { Button, Header } from "./components";
import { initWeb3, web3Modal, logoutOfWeb3Modal } from "./utils/web3Modal";

import GET_TRANSFERS from "./graphql/subgraph";
import Main from "./components/main";
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';



const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Helvetica",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function WalletButton({ provider, loadWeb3Modal }) {
  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
}

function App() {
  const { loading, error, data } = useQuery(GET_TRANSFERS);
  const [provider, setProvider] = useState();
  const [web3js, setWeb3js] = useState();
  const [account, setAccount] = useState("");

  /* Open wallet selection modal. */
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));
    const web3js = new Web3(provider);
    setWeb3js(web3js);
  }, []);

  /* If user has loaded a wallet before, load it automatically. */
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  React.useEffect(() => {
    if (!loading && !error && data && provider) {
      // await init();
      const triggerAlreadyInjectedWeb3 = async () => {
        if (provider) {
          await init();
        }
      };
      triggerAlreadyInjectedWeb3();
    }
  }, [loading, error, data, provider]);

  const init = async () => {
    let web3;
    try {
      web3 = await initWeb3();
      // console.log(web3)
    } catch (err) {
      console.error(err);
      // setLoading(false);
      return;
    }

    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    setAccount(accounts[0]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header>
        <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} />
      </Header>
      <div>
        <div>
          <div className="bird-container bird-container--one">
            <div className="bird bird--one"></div>
          </div>
          <div className="bird-container bird-container--two">
            <div className="bird bird--two"></div>
          </div>
          <div className="bird-container bird-container--three">
            <div className="bird bird--three"></div>
          </div>
          <div className="bird-container bird-container--four">
            <div className="bird bird--four"></div>
          </div>
        </div>
      </div>
      
      {
        account ? (
          <Main account={account}></Main>
        ) : (
          
          // <Typography
          //   component="h1"
          //   variant="h5"
          //   color="textSecondary"
          //   align="center"
          // >
          //   Please connect to metamask
          // </Typography>
          <CircularProgress />

        ) // or whatever loading state you want, could be null
      }


    </ThemeProvider>
  );
}

export default App;
