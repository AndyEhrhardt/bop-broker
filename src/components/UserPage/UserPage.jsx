import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuickChart from "../QuickChart/QuickChart";
import QuickPortfolio from "../QuickPortfolio/QuickPortfolio";
import useStyles from "../styles/styles";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import LogOutButton from '../LogOutButton/LogOutButton'
import ChartList from '../ChartList/ChartList'

function UserPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "GET_ALL_CHARTS" });
    dispatch({ type: "GET_PORTFOLIO" });
  }, [dispatch]);

  return (
    <div className="container">
      <div className={classes.headerPort}>
      <LogOutButton/>
        <Typography
          sx={{
            fontWeight: 300,
            fontSize: 50,
            cursor: "pointer",
            paddingTop: 0,
            paddingBottom: 0,
            maxHeight: 30
          }}
          className={classes.quickChartTitle}
          onClick={(event) => {
            openPortfolioModal(event);
          }}
        >
          BopBroker
        </Typography>
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
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
