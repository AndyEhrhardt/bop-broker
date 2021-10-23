import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuickChart from "../QuickChart/QuickChart";
import QuickPortfolio from "../QuickPortfolio/QuickPortfolio";
import useStyles from "../styles/styles";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import ChartList from "../ChartList/ChartList";
import Paper from "@mui/material/Paper";

function UserPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "GET_ALL_CHARTS" });
    dispatch({ type: "GET_PORTFOLIO" });
    //dispatch({ type: "GET_SPECIAL_CHARTS" });
  }, [dispatch]);

  return (
    <div className="container">
      <Paper className={classes.paperMargin} elevation={8}>
      <div className={classes.headerPort}>
        <LogOutButton
        sx={{minWidth: 489}} />
        <div className={classes.logoAndTitle}>
          <img className={classes.logo} src={"images/favicon5.png"} />
          <Typography
            sx={{
              fontWeight: 300,
              fontFamily: 'roboto',
              fontSize: 55,
              paddingTop: 3,
              paddingBottom: 0,
              maxHeight: 30,
            }}
            className={classes.quickChartTitle}
          >
            BopBroker
          </Typography>
          </div>
          <QuickPortfolio />
        
      </div>

      <div className={classes.quickComponentsContainer}>
        {/* <QuickChart
          chartName={"Global"}
          sliceStart={0}
          reducer={"allCharts"}
          smallerWidth={false}
        /> */}
        <ChartList />
      </div>
      </Paper>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
