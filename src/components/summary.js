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
}));

const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

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

            <Typography component="h1" variant="h5">
              My Bird Rating is : {bird_rating.toFixed(2)}
            </Typography>

            <GaugeRate score={bird_rating}></GaugeRate>

            <Typography component="h1" variant="h5">
              For a chance to claim free $BIRD <br />
            </Typography>
            <Typography>
              Follow{" "}
              <a rel="noopener noreferrer" target="_blank" href="https://twitter.com/_birdmoney">
                Bird.Money
              </a> on twitter, join the  <a rel="noopener noreferrer" target="_blank" href="https://discord.com/invite/Z2BeCnS">discord</a>
            </Typography>

          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid item xs={12}>
          <Paper className={classes.paper}>
            <List className={classes.root}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={balance} secondary="ETH Balance" />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={transCount}
                  secondary="Transaction Count"
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemText
                  primary="First Transaction"
                  secondary={start.toLocaleDateString("en-US", DATE_OPTIONS)}
                />
                <ListItemText
                  primary="Last Transaction"
                  secondary={end.toLocaleDateString("en-US", DATE_OPTIONS)}
                />
              </ListItem>
            </List>
          </Paper>
          </Grid>
          <Grid item xs={12}>
          <Paper className={classes.paper, classes.rating}>
            <List className={classes.root}>
              <ListItem>
                <ListItemText primary="Payment History" />
                <ListItemAvatar>
                  <Avatar
                    className={transCount > 50 ? classes.green : classes.orange}
                  >
                    {transCount > 50 ? "A" : "B"}
                  </Avatar>
                </ListItemAvatar>
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="Debt History" />
                <ListItemAvatar>
                  <Avatar
                    className={
                      credit_age > 500 ? classes.green : classes.orange
                    }
                  >
                    {credit_age > 500 ? "A" : "B"}
                  </Avatar>
                </ListItemAvatar>
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="Credit Age" />
                <ListItemAvatar>
                  <Avatar
                    className={
                      credit_age > 500 ? classes.green : classes.orange
                    }
                  >
                    {credit_age > 500 ? "A" : "B"}
                  </Avatar>
                </ListItemAvatar>
              </ListItem>
            </List>
          </Paper>
          </Grid>

        </Grid>
        <Grid hidden item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <List className={classes.root}>
              <ListItem>
                <ListItemText primary="Payment History" />
                <ListItemAvatar>
                  <Avatar
                    className={transCount > 50 ? classes.green : classes.orange}
                  >
                    {transCount > 50 ? "A" : "B"}
                  </Avatar>
                </ListItemAvatar>
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="Debt History" />
                <ListItemAvatar>
                  <Avatar
                    className={
                      credit_age > 500 ? classes.green : classes.orange
                    }
                  >
                    {credit_age > 500 ? "A" : "B"}
                  </Avatar>
                </ListItemAvatar>
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="Credit Age" />
                <ListItemAvatar>
                  <Avatar
                    className={
                      credit_age > 500 ? classes.green : classes.orange
                    }
                  >
                    {credit_age > 500 ? "A" : "B"}
                  </Avatar>
                </ListItemAvatar>
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography component="h1">
              External Oracle Data (only for demo)
            </Typography>
            <TreeMap></TreeMap>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Summary;
