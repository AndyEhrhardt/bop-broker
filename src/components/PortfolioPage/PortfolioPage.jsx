import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import "@fontsource/roboto/300.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";

import portfolioStyles from "./portfolioStyles";
import BuySellModal from "../BuySellModal/BuySellModal";

import PortfolioHoldings from './PortfolioHoldings'


function PortfolioPage() {
  const classes = portfolioStyles();
  const history = useHistory();
  const portfolio = useSelector((store) => store.portfolio);
  const [elev, setElev] = useState(16);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [modalPop, setModalPop] = useState(false);
  const [buySellTrack, setBuySellTrack] = useState({});
  const [buySellPrice, setBuySellPrice] = useState(0);

  const mouseEnter = () => {
    setElev(12);
  };

  const mouseLeave = () => {
    setElev(4);
  };
  const handleChangePage = (event, newPage)=> {
    setPage(newPage)
  };

  const handleSell = (track, price) => {
    console.log(track, price);
    setBuySellTrack(track);
    setBuySellPrice(price);
    setModalPop(true);
    //dispatch({ type: 'SELL_ALL_SHARES', payload: track});
  };
  return (
    <>
    <div className={classes.masterWrap}>
      <Paper
        className={classes.quickChartWrapper}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        elevation={elev}
      > 
        {portfolio.currentMoney === undefined ? (
          <>loading</>
        ) : (
          <>
            <BuySellModal
              modalPop={modalPop}
              setModalPop={setModalPop}
              track={buySellTrack}
              price={buySellPrice}
              buyingPower={portfolio.currentMoney.buying_power}
            />
            <div className={classes.quickPortMaster}>
              <h2 className={classes.quickChartTitle}>Portfolio</h2>
              
              <div className={classes.quickPortColMaster}>
                <div className={classes.quickSubTitle}>
                    <Typography sx={{ fontWeight: 500 }}>Equity</Typography>
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
                      sx={{ fontWeight: 500,
                      color: portfolio.gains }}

                    >
                      ${(portfolio.currentMoney.total_cash).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                    <Typography
                      className={classes.quickPortColRight}
                      sx={{ fontWeight: 400}}
                    >
                      ${portfolio.currentMoney.buying_power.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                    <Typography
                      className={classes.quickPortColRight}
                      sx={{ fontWeight: 500,
                        color: portfolio.gains}}
                    >
                      $
                      {(portfolio.currentMoney.total_cash - portfolio.currentMoney.buying_power).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                  </div>
                </div>
                <div className={classes.divider}></div>
                <div className={classes.quickSubTitle}>
                    <Typography sx={{ fontWeight: 500 }}>Returns</Typography>
                </div>
                <div className={classes.quickPortGap}>
                  <div className={classes.quickPortColInfoLeft}>
                    <Typography
                      className={classes.quickPortfolioInfo}
                      sx={{ fontWeight: 400 }}
                    >
                      {portfolio.historicalTotal[0].value-portfolio.historicalTotal[1].value < 0 ? 
                      "24h Return $"  : 
                      portfolio.historicalTotal[0].value-portfolio.historicalTotal[1].value === 0 ? 
                      "24h Return $" :
                      "24h Return $"
                      } 
                    </Typography>
                    <Typography
                      className={classes.quickPortfolioInfo}
                      sx={{ fontWeight: 400 }}
                    >
                      {portfolio.historicalTotal[0].value-portfolio.historicalTotal[1].value < 0 ? 
                      "24h Return %"  : 
                      portfolio.historicalTotal[0].value-portfolio.historicalTotal[1].value === 0 ? 
                      "24h Return %" :
                      "24h Return %"
                      } 
                    </Typography>
                    <Typography
                      className={classes.quickPortfolioInfo}
                      sx={{ fontWeight: 400 }}
                    >
                      Dividend
                    </Typography>
                    <Typography
                      className={classes.quickPortfolioInfo}
                      sx={{ fontWeight: 400 }}
                    >
                      {portfolio.historicalTotal[0].value-portfolio.historicalTotal[1].value < 0 ? 
                      "Weekly Return $"  : 
                      portfolio.historicalTotal[0].value-portfolio.historicalTotal[1].value === 0 ? 
                      "Weekly Return $" :
                      "Weekly Return $"
                      } 
                    </Typography>
                    <Typography
                      className={classes.quickPortfolioInfo}
                      sx={{ fontWeight: 400 }}
                    >
                      {portfolio.historicalTotal[0].value-portfolio.historicalTotal[1].value < 0 ? 
                      "Return %"  : 
                      portfolio.historicalTotal[0].value-portfolio.historicalTotal[1].value === 0 ? 
                      "Return %" :
                      "Return %"
                      } 
                    </Typography>
                    <Typography
                      className={classes.quickPortfolioInfo}
                      sx={{ fontWeight: 400 }}
                    >
                      Dividend
                    </Typography>
                  </div>
                  <div className={classes.quickPortColInfo}>
                    <Typography
                      className={classes.quickPortColRight}
                      sx={{ fontWeight: 500,
                        color: portfolio.gains }}
                    >
                     
                    ${Math.abs((portfolio.historicalTotal[0].value-portfolio.historicalTotal[1].value)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                    <Typography
                      className={classes.quickPortColRight}
                      sx={{ fontWeight: 500,
                        color: portfolio.gains }}
                    >
                    {Math.abs(((((portfolio.historicalTotal[0].value/portfolio.historicalTotal[1].value)-1)*100).toFixed(2)))}%
                    </Typography>
                    <Typography
                      className={classes.quickPortColRight}
                      sx={{ fontWeight: portfolio.currentMoney.daily_dividend === 0 ? 400 : 500,
                        color: portfolio.currentMoney.daily_dividend === 0 ? "#000000" :  "#06f202" }}
                      >
                      ${portfolio.currentMoney.daily_dividend.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                    <Typography
                      className={classes.quickPortColRight}
                      sx={{ fontWeight: 500,
                        color: portfolio.gains }}
                    >
                     
                    ${Math.abs((portfolio.historicalTotal[0].value-portfolio.historicalTotal[1].value)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                    <Typography
                      className={classes.quickPortColRight}
                      sx={{ fontWeight: 500,
                        color: portfolio.gains }}
                    >
                    {Math.abs(((((portfolio.historicalTotal[0].value/portfolio.historicalTotal[1].value)-1)*100).toFixed(2)))}%
                    </Typography>
                    <Typography
                      className={classes.quickPortColRight}
                      sx={{ fontWeight: portfolio.currentMoney.daily_dividend === 0 ? 400 : 500,
                        color: portfolio.currentMoney.daily_dividend === 0 ? "#000000" :  "#06f202" }}
                      >
                      ${portfolio.currentMoney.daily_dividend.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        
      </Paper>
      <PortfolioHoldings/>
      </div>
    </>
  );
}

export default PortfolioPage;