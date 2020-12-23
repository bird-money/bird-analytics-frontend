import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import Divider from "@material-ui/core/Divider";
import GaugeRate from "./shared/rating";
import Assets from "./shared/assets";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import { Button, Header } from "./../components";

import { scaleLinear } from "d3-scale";
import TreeMap from "./shared/treemap";

import {
  yellow,
  green,
  deepOrange,
  deepPurple,
} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "none",
    backgroundColor: "transparent",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  rating: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
  },
  margin: {
    marginTop: theme.spacing(1),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  green: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
  },
  yellow: {
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
  },
  center: {
    textAlign: "center",
  },
}));


const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};


// make on-chain request function to Oracle
function OnChainButton({ provider, loadWeb3Modal }) {
  return (
    <Button
      onClick={() => {

        console.log("Save User Rating to On-Chain Oracle")

        // if (!provider) {
        //   loadWeb3Modal();
        // } else {
        //   logoutOfWeb3Modal();
        // }

      }}
    >
      {!provider ? "Request Onchain Rating" : "Update Onchain Rating"}
    </Button>
  );
}


function UpdateButton({ provider, loadWeb3Modal }) {
  return (
    <Button
      onClick={() => {

        console.log("Request Asset Update")
      }}
    >
      {!provider ? "Request Asset Update" : "Update Assets"}
    </Button>
  );
}


const scoreScale = scaleLinear().domain([0, 100]).range([0, 10]);

const Summary = (props) => {
  const classes = useStyles();
  const balance = props.balance;
  const transCount = props.data.length;
  const start = new Date(+props.data[0].timeStamp * 1000);
  const end = new Date(+props.data[transCount - 1].timeStamp * 1000);

  const credit_age = Math.round(Math.abs(+start - +end) / 8.64e7);

  const rating = (transCount + credit_age + Math.floor(balance) * 10) / 100;

  const bird_rating = scoreScale(rating);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  Bird Rating
                </Typography>
                <GaugeRate score={bird_rating}></GaugeRate>
              </Grid>

              <Grid item xs={4}>

                <Box position="relative" display="inline-flex">
                  <CircularProgress
                    variant="determinate"
                    value={transCount > 50 ? 75 : 25}
                  />
                  <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="textSecondary"
                    >
                      {transCount > 50 ? "A" : "B"}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="subtitle1">Payment History</Typography>
                
              </Grid>

              <Grid item xs={4}>

                                
              <Box position="relative" display="inline-flex">
                  <CircularProgress
                    variant="determinate"
                    value={credit_age > 500 ? 75 : 35}
                  />
                  <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="textSecondary"
                    >
                      {credit_age > 500 ? "A" : "B"}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="subtitle1">Debt History</Typography>

              </Grid>
              
              <Grid item xs={4}>

                                
              <Box position="relative" display="inline-flex">
                  <CircularProgress
                    variant="determinate"
                    value={credit_age > 500 ? 75 : 25}
                  />
                  <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="textSecondary"
                    >
                      {credit_age > 500 ? "A" : "B"}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="subtitle1">Credit Age</Typography>

              </Grid>
              
              <Grid container item xs={12} justify="center" alignItems="center">
                <OnChainButton></OnChainButton>
              </Grid>

            </Grid>
          
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>

          <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  Assets
                </Typography>
                <Assets></Assets>
              </Grid>

              <Grid container item xs={12} justify="center" alignItems="center">
                <UpdateButton></UpdateButton>
              </Grid>

            </Grid>

          
          </Paper>
        </Grid>
      
      </Grid>
    </div>
  );
};

export default Summary;
