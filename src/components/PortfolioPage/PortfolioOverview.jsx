import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import "@fontsource/roboto/300.css";

import portfolioStyles from "./portfolioStyles";

 
 function PortfoliowOverview(){
    const classes = portfolioStyles();
    const history = useHistory();
    const portfolio = useSelector((store) => store.portfolio);
    
    const mouseEnter = () => {
        setElev(12);
      };
    
      const mouseLeave = () => {
        setElev(4);
      };

    return(
               <div className={classes.masterOverview}>
                   <Typography className={classes.quickSubTitle} sx={{ fontWeight: 500 }}>
                        Equity
                    </Typography>
                    <div className={classes.grayLine}>

                    </div>
                <div className={classes.quickPortGap}>
                  <div className={classes.quickPortColInfoLeft}>
                    <Typography
                      className={classes.quickPortfolioInfo}
                      sx={{ fontWeight: 400 }}
                    >
                      Total Value
                    </Typography>
                    <Typography
                      className={classes.quickPortfolioInfo}
                      sx={{ fontWeight: 400 }}
                    >
                      Buying Power
                    </Typography>
                    <Typography
                      className={classes.quickPortfolioInfo}
                      sx={{ fontWeight: 400 }}
                    >
                      Total Asset Value
                    </Typography>
                  </div>
                  <div className={classes.quickPortColInfo}>
                    <Typography
                      className={classes.quickPortColRight}
                      sx={{ fontWeight: 500, color: portfolio.gains }}
                    >
                      $
                      {portfolio.currentMoney.total_cash
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                    <Typography
                      className={classes.quickPortColRight}
                      sx={{ fontWeight: 400 }}
                    >
                      $
                      {portfolio.currentMoney.buying_power
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                    <Typography
                      className={classes.quickPortColRight}
                      sx={{ fontWeight: 500, color: portfolio.gains }}
                    >
                      $
                      {(
                        portfolio.currentMoney.total_cash -
                        portfolio.currentMoney.buying_power
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                  </div>
                </div>
                <div className={classes.divider}></div>
                  <Typography className={classes.quickSubTitle} sx={{ fontWeight: 500 }}>
                      Returns
                    </Typography>
                    <div className={classes.grayLine}>

                    </div>
                <div className={classes.quickPortGap}>
                  <div className={classes.quickPortColInfoLeft}>
                    <Typography
                      className={classes.quickPortfolioInfo}
                      sx={{ fontWeight: 400 }}
                    >
                      {portfolio.historicalTotal[0].value -
                        portfolio.historicalTotal[1].value <
                      0
                        ? "24h Return $"
                        : portfolio.historicalTotal[0].value -
                            portfolio.historicalTotal[1].value ===
                          0
                        ? "24h Return $"
                        : "24h Return $"}
                    </Typography>
                    <Typography
                      className={classes.quickPortfolioInfo}
                      sx={{ fontWeight: 400 }}
                    >
                      {portfolio.historicalTotal[0].value -
                        portfolio.historicalTotal[1].value <
                      0
                        ? "24h Return %"
                        : portfolio.historicalTotal[0].value -
                            portfolio.historicalTotal[1].value ===
                          0
                        ? "24h Return %"
                        : "24h Return %"}
                    </Typography>
                    <Typography
                      className={classes.quickPortfolioInfo}
                      sx={{ fontWeight: 400 }}
                    >
                    24h Dividend
                    </Typography>
                    <Typography
                      className={classes.quickPortfolioInfo}
                      sx={{ fontWeight: 400 }}
                    >
                      {portfolio.historicalTotal[0].value -
                        portfolio.historicalTotal[portfolio.historicalTotal.length-1].value <
                      0
                        ? "Total Loss $"
                        : 
                        "Total Return $"}
                    </Typography>
                    <Typography
                      className={classes.quickPortfolioInfo}
                      sx={{ fontWeight: 400 }}
                    >
                      {portfolio.historicalTotal[0].value -
                        portfolio.historicalTotal[portfolio.historicalTotal.length-1].value <
                      0
                        ? "Total Loss %"
                        : 
                        "Total Return %"}
                    </Typography>
                  </div>
                  <div className={classes.quickPortColInfo}>
                    <Typography
                      className={classes.quickPortColRight}
                      sx={{ fontWeight: 500, color: portfolio.gains }}
                    >
                      $ 
                      {Math.abs(
                        portfolio.historicalTotal[0].value -
                          portfolio.historicalTotal[1].value
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                    <Typography
                      className={classes.quickPortColRight}
                      sx={{ fontWeight: 500, color: portfolio.gains }}
                    >
                      {Math.abs(
                        (
                          (portfolio.historicalTotal[0].value /
                            portfolio.historicalTotal[1].value -
                            1) *
                          100
                        ).toFixed(2)
                      )}
                      %
                    </Typography>
                    <Typography
                      className={classes.quickPortColRight}
                      sx={{
                        fontWeight:
                          portfolio.currentMoney.daily_dividend === 0
                            ? 400
                            : 500,
                        color:
                          portfolio.currentMoney.daily_dividend === 0
                            ? "#000000"
                            : "#06f202",
                      }}
                    >
                      $
                      {portfolio.currentMoney.daily_dividend
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                    <Typography
                      className={classes.quickPortColRight}
                      sx={{ fontWeight: 500, color: portfolio.historicalTotal[0].value -
                        portfolio.historicalTotal[portfolio.historicalTotal.length-1].value > 0 ? "#06f202" :
                        portfolio.historicalTotal[0].value - 
                        portfolio.historicalTotal[portfolio.historicalTotal.length-1].value < 0 ? "#f71500" : "#e6bb00" }}
                    >
                      $
                      {Math.abs(
                        portfolio.historicalTotal[0].value -
                          portfolio.historicalTotal[portfolio.historicalTotal.length-1].value
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      
                    </Typography>
                    <Typography
                      className={classes.quickPortColRight}
                      sx={{ fontWeight: 500, color: portfolio.historicalTotal[0].value -
                        portfolio.historicalTotal[portfolio.historicalTotal.length-1].value > 0 ? "#06f202" :
                        portfolio.historicalTotal[0].value - 
                        portfolio.historicalTotal[portfolio.historicalTotal.length-1].value < 0 ? "#f71500" : "#e6bb00"}}
                    >
                      {Math.abs(
                        (
                          (portfolio.historicalTotal[0].value /
                            portfolio.historicalTotal[portfolio.historicalTotal.length-1].value -
                            1) *
                          100
                        ).toFixed(2)
                      )}
                      %
                    </Typography>
                  </div>
                </div>
            </div>
    )
}

export default PortfoliowOverview;