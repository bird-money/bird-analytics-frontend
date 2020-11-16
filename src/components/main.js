import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Paper } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Address from "./address";
import XGridDemo from "./transactions";
import Summary from "./summary";
import Bird from "./../bird_logo.png";

const useStyles = makeStyles((theme) => ({
  typography: {
    fontFamily: [
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  root: {
    background: "none",
    backgroundColor: "transparent",
  },
  body: {
    background: "none",
    backgroundColor: "transparent",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: theme.palette.secondary.main,
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Copyright() {

  return (
    <div>
      <Typography variant="body1" color="textPrimary" align="center">
        How to Use <br />
        Add an account with transaction history on the ethereum mainnet to see
        valid result. Any issues, please contact admin@bird.money
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" target="_blank" href="https://bird.money">
          Bird.Money
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
        <br />
        Follow us on &nbsp;
        <Link color="error" target="_blank" href="https://twitter.com/_birdmoney" >
          Twitter 
        </Link> |
        <Link color="error" target="_blank" href="https://discord.gg/Z2BeCnS" >
        &nbsp;Discord
        </Link> |
        <Link color="error" target="_blank" href="https://medium.com/bird-money" >
        &nbsp;Medium
        </Link>
      </Typography>
      <div>

        {/* <ul class="nav justify-content-center">
          <li class="nav-item mr-2">
            <a
              class="nav-link btn-outline-primary"
              target="_blank"
              href="https://twitter.com/_birdmoney">
              <i
                class="fab fa-twitter"
                style="font-size: 5vh;"
                aria-hidden="true"
              ></i>
            </a>
          </li>

          <li class="nav-item mr-2">
            <a
              class="nav-link btn-outline-dark"
              target="_blank"
              href="https://discord.gg/Z2BeCnS"
            >
              <i
                class="fab fa-discord"
                style="font-size: 5vh;"
                aria-hidden="true"
              ></i>
            </a>
          </li>

          <li class="nav-item mr-2">
            <a
              class="nav-link btn-outline-dark"
              target="_blank"
              href="https://medium.com/bird-money"
            >
              <i
                class="fab fa-medium"
                style="font-size: 5vh;"
                aria-hidden="true"
              ></i>
            </a>
          </li>

          <li class="nav-item mr-2">
            <a
              class="nav-link btn-outline-danger"
              target="_blank"
              alt="Contract"
              href="https://etherscan.io/address/0x70401dFD142A16dC7031c56E862Fc88Cb9537Ce0#code"
            >
              <i
                class="far fa-file-code	"
                style="font-size: 5vh;"
                aria-hidden="true"
              ></i>
            </a>
          </li>
        </ul> */}
      </div>
    </div>
  );
}

const Main = (props) => {
  const classes = useStyles();
  const account = props.account;

  const [valueOfUserInput, setUserChange] = useState("");
  const [Ethersdata, setEtherdata] = useState("");
  const [EthBalance, setEthBalance] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    loadEtherscan(valueOfUserInput);
    EtherBalance(valueOfUserInput);
  };

  useEffect(() => {
    const trigger = async () => {
      if (account) {
        await loadDefault();
      }
    };
    trigger();
  }, []);

  const loadDefault = async () => {
    loadEtherscan(account);
    EtherBalance(account);
  };

  const handleUserInputChange = (e) => {
    setUserChange(e.target.value);
  };

  // TODO: load data through bird api as oppose to therscan api
  function loadEtherscan(address) {
    const etherApi = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_API}`;
    fetch(etherApi)
      .then((res) => res.json())
      .then(
        (result) => {
          const data = result.result;
          setEtherdata(data);
        },
        (error) => {
          console.log(error);
          setError(error);
        }
      );
  }

  function EtherBalance(address) {
    const birdApi = `https://www.bird.money/analytics/address/${address}`;
    fetch(birdApi)
      .then((res) => res.json())
      .then(
        (result) => {
          const balance = (result[0].eth_balance).toFixed(4)
          setEthBalance(balance);
        },
        (error) => {
          console.log(error);
          setError(error);
        }
      );
  }

  return (
    <Container className={classes.root}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={Bird}></Avatar>
          <Typography component="h1" variant="h5">
            Bird Analytics
          </Typography>
          <Address
            valueOfUserInput={valueOfUserInput}
            onUserSubmit={handleSubmit}
            onUserInputChange={handleUserInputChange}
            style={classes}
          ></Address>
        </div>
      </Container>

      {
        Ethersdata.length > 1 && EthBalance ? (
          <Summary data={Ethersdata} balance={EthBalance}></Summary>
        ) : (
          <div>{error}</div>
        ) // or whatever loading state you want, could be null
      }
      <Paper>
        {/* <Typography component="h1" variant="h5">
            Equities (ICO), Liquidity (ETH), Fixed Income (Bank Statement), 
      </Typography> */}
        {/* <TreeMap></TreeMap> */}
      </Paper>
      <Paper className={classes.paper}>
        {
          Ethersdata.length > 1 ? (
            <XGridDemo data={Ethersdata} style={classes}></XGridDemo>
          ) : (
            // <LoadingSpinner />
            <div>{error}</div>
          ) // or whatever loading state you want, could be null
        }
      </Paper>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Main;
