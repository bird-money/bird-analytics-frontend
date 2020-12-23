import React, { useCallback, useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useQuery } from "@apollo/react-hooks";
import Web3 from "web3";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { Button, Header } from "./components";
import { initWeb3, web3Modal, logoutOfWeb3Modal } from "./utils/web3Modal";

import GET_TRANSFERS from "./graphql/subgraph";
import Main from "./components/main";

import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Bird from "./bird_logo.png";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  sidebarList: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  sidebar: {
    height: "100vh",
  },
  marginTop: {
    marginTop: theme.spacing(8),
  }
}));

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
  const classes = useStyles();

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

    } catch (err) {
      console.error(err);
      return;
    }

    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    setAccount(accounts[0]);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={2}>
            <Paper className={(classes.paper, classes.sidebar)}>
              <List component="nav" aria-label="sidebar">
                <ListItem button>
                  <ListItemIcon>
                    {/* <InboxIcon /> */}
                    <Avatar className={classes.avatar} src={Bird}>
                      {" "}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary="Bird.Money" />
                </ListItem>

                <Divider />

                <ListItem button className={classes.sidebarList}>
                  <ListItemText primary="Dashboard" />
                </ListItem>

                <ListItem button className={classes.sidebarList}>
                  <ListItemText primary="Farm" />
                </ListItem>

                <ListItem button className={classes.sidebarList}>
                  <ListItemText primary="Oracle Analytics" />
                </ListItem>

                <ListItem button className={classes.sidebarList}>
                  <ListItemText primary="Governance" />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={10}>

            <Container className={classes.root, classes.marginTop}>
            <Grid container>
              <Grid item xs={10}>
                <Typography component="h1" variant="h5">
                  Oracle Analytics
                </Typography>
                <Typography component="h1" variant="h5">
                  Off-Chain Oracle Analytics and ID
                </Typography>

                <Typography variant="body1" color="textPrimary">
                  *You will need to hold BIRD to access some of the services below (connect a wallet with transaction history and ETH)
                </Typography>
                <br/>
              </Grid>
              <Grid item xs={2}>
                <WalletButton
                  provider={provider}
                  loadWeb3Modal={loadWeb3Modal}
                />
              </Grid>
            </Grid>
            </Container>

            {
              account ? (
                <Main account={account}></Main>
              ) : (
                <Typography
                  component="h1"
                  variant="h5"
                  color="textSecondary"
                  align="center"
                >
                  <CircularProgress />
                  Please connect to metamask
                </Typography>
              ) // or whatever loading state you want, could be null
            }
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
