import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
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
import PortfolioPage from "../PortfolioPage/PortfolioPage";

import useStyles from "../styles/styles";
import BuySellModal from "../BuySellModal/BuySellModal";

function QuickPortfolio() {
  const classes = useStyles();
  const history = useHistory();
  const portfolio = useSelector((store) => store.portfolio);
  const [elev, setElev] = useState(0);
  const [page, setPage] = useState(1);
  const [modalPop, setModalPop] = useState(false);
  const [buySellTrack, setBuySellTrack] = useState({});
  const [buySellPrice, setBuySellPrice] = useState(0);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [modalPortfolioOpen, setModalPortfolioOpen] = useState(true);

  const mouseEnter = () => {
    setElev(12);
  };

  const mouseLeave = () => {
    setElev(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSell = (track, price) => {
    console.log(track, price);
    setBuySellTrack(track);
    setBuySellPrice(price);
    setModalPop(true);
    //dispatch({ type: 'SELL_ALL_SHARES', payload: track});
  };
  const openPortfolioModal = (event) => {
    event.preventDefault();
    setModalPortfolioOpen(true);
    setPortfolioOpen(true);
  };

  return (
    <>
      <Paper
        className={classes.quickPortfolio}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        elevation={elev}
      >
        {portfolio.currentMoney === undefined ? (
          <></>
        ) : (
          <>
            <PortfolioPage
              modalPortfolioOpen={modalPortfolioOpen}
              setModalPortfolioOpen={setModalPortfolioOpen}
              portfolioOpen={portfolioOpen}
              setPortfolioOpen={setPortfolioOpen}
            />
            <BuySellModal
              modalPop={modalPop}
              setModalPop={setModalPop}
              track={buySellTrack}
              price={buySellPrice}
              buyingPower={portfolio.currentMoney.buying_power}
            />
            <div className={classes.quickPortMaster}>
            <Box
            sx={{cursor: "pointer"}}
            className={classes.hoverOnOverview}
            onClick={(event) => {
              openPortfolioModal(event);
            }}>
              <div>
                
                <Typography
                  sx={{
                    fontWeight: 300,
                    fontSize: 35,
                    cursor: "pointer",
                    paddingTop: 0,
                    paddingBottom: 0,
                    textAlign: "center",
                  }}
                  onClick={(event) => {
                    openPortfolioModal(event);
                  }}
                >
                  Portfolio
                </Typography>
                <div className={classes.quickSubTitle1}>
                  <Typography sx={{ fontWeight: 500 }}>Equity</Typography>
                  <Typography sx={{ fontWeight: 500 }}>Returns</Typography>
                </div>
                <div className={classes.quickPortColMaster}>
                  <div className={classes.quickPortGap}>
                    <div className={classes.quickPortColInfoLeft}>
                      <Typography
                        className={classes.quickPortfolioInfo}
                        sx={{ fontWeight: 300 }}
                      >
                        Net
                      </Typography>
                      <Typography
                        className={classes.quickPortfolioInfo}
                        sx={{ fontWeight: 300 }}
                      >
                        Excess
                      </Typography>
                      <Typography
                        className={classes.quickPortfolioInfo}
                        sx={{ fontWeight: 300 }}
                      >
                        Assets
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
                  <div className={classes.quickPortGap}>
                    <div className={classes.quickPortColInfoLeft}>
                      <Typography
                        className={classes.quickPortfolioInfo}
                        sx={{ fontWeight: 300 }}
                      >
                        {portfolio.historicalTotal[0].value -
                          portfolio.historicalTotal[1].value <
                        0
                          ? "Loss $"
                          : portfolio.historicalTotal[0].value -
                              portfolio.historicalTotal[1].value ===
                            0
                          ? "Even $"
                          : "Gain $"}
                      </Typography>
                      <Typography
                        className={classes.quickPortfolioInfo}
                        sx={{ fontWeight: 300 }}
                      >
                        {portfolio.historicalTotal[0].value -
                          portfolio.historicalTotal[1].value <
                        0
                          ? "Loss %"
                          : portfolio.historicalTotal[0].value -
                              portfolio.historicalTotal[1].value ===
                            0
                          ? "Even %"
                          : "Gain %"}
                      </Typography>
                      <Typography
                        className={classes.quickPortfolioInfo}
                        sx={{ fontWeight: 300 }}
                      >
                        Dividend
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
                    </div>
                  </div>
                </div>
              </div>
              </Box>
              <div className={"table"}>
                <TableContainer sx={{ maxHeight: 175 }}>
                  <Typography component={"span"}>
                    <Table stickyHeader size="small">
                      <TableHead >
                        <TableRow>
                          <TableCell
                            align="left"
                            sx={{
                              paddingRight: 1.3,
                              paddingLeft: 1,
                              width: 0.1,
                              maxWidth: 0.3,
                              fontFamily: "roboto",
                              fontWeight: 500,
                              fontSize: 15,
                            }}
                          >
                            Rank
                          </TableCell>
                          <TableCell
                            sx={{
                              fontFamily: "roboto",
                              fontWeight: 500,
                              fontSize: 15,
                              paddingRight: 1,
                            }}
                            className={classes.portTableCellSongArtist}
                            align="right"
                          >
                            Song
                          </TableCell>
                          <TableCell
                            className={classes.tableCellPrice}
                            sx={{
                              fontFamily: "roboto",
                              fontWeight: 500,
                              fontSize: 15,
                              paddingLeft: 0,
                              paddingRight: 1,
                            }}
                            align="right"
                          >
                            Value
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {portfolio.currentHoldings.map((track, index) => (
                            <TableRow
                              className={classes.tableRow}
                              key={index}
                              sx={{
                                "td, th": {
                                  paddingBottom: 0.35,
                                  paddingTop: 0.35,
                                  cursor: "pointer",
                                },
                              }}
                            >
                              <TableCell
                                align="left"
                                sx={{
                                  paddingRight: 1.3,
                                  paddingLeft: 1.5,
                                  width: 0.1,
                                  maxWidth: 0.3,
                                }}
                              >
                                {track.current_rank}
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontFamily: "roboto",
                                  paddingRight: 1,
                                  paddingLeft: 1,
                                  maxWidth: 80,
                                }}
                                align="right"
                                className={classes.tableCellSongArtist}
                              >
                                <a style={{ fontWeight: 400 }}>
                                  {track.song_name.split("(")[0]}
                                </a>
                              </TableCell>
                              <TableCell
                                sx={{ paddingRight: 1.3, paddingLeft: 0 }}
                                align="right"
                              >
                                <a style={{ fontWeight: 400 }}>
                                  $
                                  {track.current_price === 2500
                                    ? "2.5k"
                                    : track.current_price === 1250
                                    ? "1.2k"
                                    : track.current_price}
                                </a>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </Typography>
                </TableContainer>
              </div>
            </div>
          </>
        )}
      </Paper>
    </>
  );
}

export default QuickPortfolio;
