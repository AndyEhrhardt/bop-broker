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
import SwapVertIcon from "@mui/icons-material/SwapVert";

import portfolioStyles from "./portfolioStyles";
import BuySellModal from "../BuySellModal/BuySellModal";

const priceObject = {
  1: 2500,
  2: 1250,
  3: 833,
  4: 625,
  5: 500,
  6: 416,
  7: 357,
  8: 312,
  9: 277,
  10: 250,
  11: 227,
  12: 208,
  13: 192,
  14: 178,
  15: 166,
  16: 156,
  17: 147,
  18: 138,
  19: 131,
  20: 125,
  21: 119,
  22: 113,
  23: 108,
  24: 104,
  25: 100,
  26: 96,
  27: 92,
  28: 89,
  29: 86,
  30: 83,
  31: 80,
  32: 77,
  33: 75,
  34: 73,
  35: 71,
  36: 69,
  37: 67,
  38: 65,
  39: 63,
  40: 61,
  41: 59,
  42: 58,
  43: 57,
  44: 56,
  45: 55,
  46: 54,
  47: 53,
  48: 52,
  49: 51,
  50: 50,
};
const chartNamesObj = {
  "37i9dQZEVXbMDoHDwVN2tF": "Global",
  "37i9dQZEVXbLRQDuF5jeBp": "US",
  "37i9dQZEVXbMXbN3EUUhlg": "Brazil",
  "37i9dQZEVXbKXQ4mDTEBXq": "Japan",
  "37i9dQZEVXbNFJfN1Vw8d9": "Spain",
  "37i9dQZEVXbObFQZ3JLcXt": "Indonesia",
  "37i9dQZEVXbMMy2roB9myp": "Argentina",
  "37i9dQZEVXbO3qyFxbkOE1": "Mexico",
  "37i9dQZEVXbKCF6dqVpDkS": "Netherlands",
  "37i9dQZEVXbJiZcmkrIHGU": "Germany",
  "37i9dQZEVXbIQnj7RRhdSX": "Italy",
  "37i9dQZEVXbNOUPGj7tW6T": "Paraguay",
  "37i9dQZEVXbL0GavIqMTeb": "Chile",
  "37i9dQZEVXbNBz9cRCSFkY": "Philippines",
  "37i9dQZEVXbIVYVBNw9D5K": "Turkey",
  "37i9dQZEVXbLoATJ81JYXz": "Sweden",
  "37i9dQZEVXbOa2lmxNORXQ": "Columbia",
  "37i9dQZEVXbJvfa0Yxg7E7": "Norway",
  "37i9dQZEVXbIPWwFssbupI": "France",
  "37i9dQZEVXbJPcfkRz0wJ0": "Australia",
};
function PortfolioHoldings() {
  const classes = portfolioStyles();
  const history = useHistory();
  const portfolio = useSelector((store) => store.portfolio);
  const [elev, setElev] = useState(16);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [modalPop, setModalPop] = useState(false);
  const [buySellTrack, setBuySellTrack] = useState({});
  const [buySellPrice, setBuySellPrice] = useState(0);

  const handleSell = (track, price) => {
    console.log(track, price);
    setBuySellTrack(track);
    setBuySellPrice(price);
    setModalPop(true);
    //dispatch({ type: 'SELL_ALL_SHARES', payload: track});
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      {portfolio.currentMoney === undefined ||
      portfolio.currentHoldings.length === 0 ? (
        <></>
      ) : (
        <div className={"table"}>
          <BuySellModal
              modalPop={modalPop}
              setModalPop={setModalPop}
              track={buySellTrack}
              price={buySellPrice}
              buyingPower={portfolio.currentMoney.buying_power}
            />
          <TableContainer>
            <Typography component={"span"}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{ paddingRight: 1.3, paddingLeft: 1.5 }}
                    >
                      Trade
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ paddingRight: 1.3, paddingLeft: 1.5 }}
                    >
                      24h%
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ paddingRight: 1.3, paddingLeft: 1.5 }}
                    >
                      Total%
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ paddingRight: 1.3, paddingLeft: 1.5 }}
                    >
                      24h
                      <br></br>
                      Rank
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ paddingRight: 1.3, paddingLeft: 1.5 }}
                    >
                      Total
                      <br></br>
                      Rank
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        paddingRight: 1.3,
                        paddingLeft: 1,
                        fontFamily: "roboto",
                        fontWeight: 500,
                        fontSize: 15,
                      }}
                    >
                      Current
                      <br></br>
                      Rank
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "roboto",
                        fontWeight: 500,
                        fontSize: 15,
                        paddingRight: 1.3,
                      }}
                      className={classes.portTableCellSongArtist}
                      align="right"
                    >
                      Song/Arist
                    </TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "roboto",
                        fontWeight: 500,
                        fontSize: 15,
                        paddingRight: 0.1,
                      }}
                      align="right"
                    >
                      On Chart
                    </TableCell>
                    <TableCell
                      className={classes.tableCellPrice}
                      sx={{
                        fontFamily: "roboto",
                        fontWeight: 500,
                        fontSize: 15,
                        width: 40,
                        minWidth: 40,
                        paddingLeft: 1,
                        paddingRight: 1,
                      }}
                      align="right"
                    >
                      # Of
                      <br></br>
                      Shares
                    </TableCell>
                    <TableCell
                      className={classes.tableCellPrice}
                      sx={{
                        fontFamily: "roboto",
                        fontWeight: 500,
                        fontSize: 15,
                        width: 40,
                        minWidth: 40,
                        paddingLeft: 1,
                        paddingRight: 1,
                      }}
                      align="right"
                    >
                      Share
                      <br></br>
                      Price
                    </TableCell>
                    <TableCell
                      className={classes.tableCellPrice}
                      sx={{
                        fontFamily: "roboto",
                        fontWeight: 500,
                        fontSize: 15,
                        width: 40,
                        minWidth: 40,
                        paddingLeft: 1,
                        paddingRight: 1,
                      }}
                      align="right"
                    >
                      Total
                      <br></br>
                      Value
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {portfolio.currentHoldings
                    .slice(page * 3, page * 3 + 3)
                    .map((track, index) => (
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
                        <TableCell>
                        <Button
                          onClick={() =>
                                handleSell(track, track.current_price)
                          }
                        >
                              $
                        </Button>
                        </TableCell>
                        {portfolio.historicalSongValue[track.holding_id]
                          .length > 1 ? (
                          <TableCell
                            align="left"
                            sx={{
                              paddingRight: 1.3,
                              paddingLeft: 1.5,
                              fontWeight: 500,
                              color:
                                portfolio.historicalSongValue[
                                  track.holding_id
                                ][1].rank -
                                  portfolio.historicalSongValue[
                                    track.holding_id
                                  ][0].rank >
                                0
                                  ? "#06f202"
                                  : portfolio.historicalSongValue[
                                      track.holding_id
                                    ][1].rank -
                                      portfolio.historicalSongValue[
                                        track.holding_id
                                      ][0].rank <
                                    0
                                  ? "#f71500"
                                  : "#e6bb00",
                            }}
                          >     
                            {portfolio.historicalSongValue[track.holding_id][1]
                              .rank -
                              portfolio.historicalSongValue[track.holding_id][0]
                                .rank >
                            0
                              ? "+"
                              : ""}
                            {(
                              (track.current_price /
                                priceObject[
                                  portfolio.historicalSongValue[
                                    track.holding_id
                                  ][1].rank
                                ] -
                                1) *
                              100
                            ).toFixed(2)}
                            %
                          </TableCell>
                        ) : (
                          <TableCell
                            align="left"
                            sx={{
                              paddingRight: 1.3,
                              paddingLeft: 1.5,
                              fontWeight: 500,
                              color: "#e6bb00",
                            }}
                          >
                            0%
                          </TableCell>
                        )}

                        <TableCell
                          align="left"
                          sx={{
                            paddingRight: 1.3,
                            paddingLeft: 1.5,
                            fontWeight: 500,
                            color:
                              portfolio.historicalSongValue[track.holding_id][
                                portfolio.historicalSongValue[track.holding_id]
                                  .length - 1
                              ].rank -
                                portfolio.historicalSongValue[
                                  track.holding_id
                                ][0].rank >
                              0
                                ? "#06f202"
                                : portfolio.historicalSongValue[
                                    track.holding_id
                                  ][
                                    portfolio.historicalSongValue[
                                      track.holding_id
                                    ].length - 1
                                  ].rank -
                                    portfolio.historicalSongValue[
                                      track.holding_id
                                    ][0].rank <
                                  0
                                ? "#f71500"
                                : "#e6bb00",
                          }}
                        >
                          {portfolio.historicalSongValue[track.holding_id][
                            portfolio.historicalSongValue[track.holding_id]
                              .length - 1
                          ].rank -
                            portfolio.historicalSongValue[track.holding_id][0]
                              .rank >
                          0
                            ? "+"
                            : ""}
                          {(
                            (track.current_price /
                              priceObject[
                                portfolio.historicalSongValue[track.holding_id][
                                  portfolio.historicalSongValue[
                                    track.holding_id
                                  ].length - 1
                                ].rank
                              ] -
                              1) *
                            100
                          ).toFixed(2)}
                          %
                        </TableCell>
                        {portfolio.historicalSongValue[track.holding_id]
                          .length > 1 ? (
                          <TableCell
                            align="left"
                            sx={{
                              paddingRight: 1.3,
                              paddingLeft: 1.5,
                              fontWeight: 500,
                              color:
                                portfolio.historicalSongValue[
                                  track.holding_id
                                ][1].rank -
                                  portfolio.historicalSongValue[
                                    track.holding_id
                                  ][0].rank >
                                0
                                  ? "#06f202"
                                  : portfolio.historicalSongValue[
                                      track.holding_id
                                    ][1].rank -
                                      portfolio.historicalSongValue[
                                        track.holding_id
                                      ][0].rank <
                                    0
                                  ? "#f71500"
                                  : "#e6bb00",
                            }}
                          >
                            {portfolio.historicalSongValue[track.holding_id][1]
                              .rank -
                              portfolio.historicalSongValue[track.holding_id][0]
                                .rank >
                            0
                              ? "+"
                              : ""}
                            {portfolio.historicalSongValue[track.holding_id][1]
                              .rank -
                              portfolio.historicalSongValue[track.holding_id][0]
                                .rank}
                          </TableCell>
                        ) : (
                          <TableCell
                            align="left"
                            sx={{
                              paddingRight: 1.3,
                              paddingLeft: 1.5,
                              fontWeight: 500,
                              color: "#e6bb00",
                            }}
                          >
                            0
                          </TableCell>
                        )}
                        <TableCell
                          align="left"
                          sx={{
                            paddingRight: 1.3,
                            paddingLeft: 1.5,
                            fontWeight: 500,
                            color:
                              portfolio.historicalSongValue[track.holding_id][
                                portfolio.historicalSongValue[track.holding_id]
                                  .length - 1
                              ].rank -
                                portfolio.historicalSongValue[
                                  track.holding_id
                                ][0].rank >
                              0
                                ? "#06f202"
                                : portfolio.historicalSongValue[
                                    track.holding_id
                                  ][
                                    portfolio.historicalSongValue[
                                      track.holding_id
                                    ].length - 1
                                  ].rank -
                                    portfolio.historicalSongValue[
                                      track.holding_id
                                    ][0].rank <
                                  0
                                ? "#f71500"
                                : "#e6bb00",
                          }}
                        >
                          {portfolio.historicalSongValue[track.holding_id][
                            portfolio.historicalSongValue[track.holding_id]
                              .length - 1
                          ].rank -
                            portfolio.historicalSongValue[track.holding_id][0]
                              .rank >
                          0
                            ? "+"
                            : ""}
                          {portfolio.historicalSongValue[track.holding_id][
                            portfolio.historicalSongValue[track.holding_id]
                              .length - 1
                          ].rank -
                            portfolio.historicalSongValue[track.holding_id][0]
                              .rank}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ paddingRight: 1.3, paddingLeft: 1.5 }}
                        >
                          {track.current_rank}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "roboto",
                            paddingRight: 1.3,
                            paddingLeft: 1,
                          }}
                          align="right"
                          className={classes.tableCellSongArtist}
                        >
                          <a style={{ fontWeight: 400 }}>
                            {track.song_name.split("(")[0]}
                          </a>
                          <br />
                          <i style={{ fontWeight: 300, fontSize: 13 }}>
                            {track.artist}
                          </i>
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "roboto",
                            paddingRight: 0.1,
                            paddingLeft: 1.1,
                            width: 20,
                            minWidth: 80,
                          }}
                          align="right"
                        >
                          {chartNamesObj[track.spotify_playlist_id]}
                        </TableCell>
                        <TableCell
                          sx={{ paddingRight: 1, paddingLeft: 1 }}
                          align="right"
                        >
                          <a style={{ fontWeight: 400 }}>{track.quantity}</a>
                        </TableCell>
                        <TableCell
                          sx={{ paddingRight: 1, paddingLeft: 1 }}
                          align="right"
                        >
                          <a style={{ fontWeight: 400 }}>
                            $
                            {priceObject[track.current_rank]
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </a>
                        </TableCell>
                        <TableCell
                          sx={{ paddingRight: 1, paddingLeft: 1 }}
                          align="right"
                        >
                          <a style={{ fontWeight: 400 }}>
                            $
                            {(track.quantity * track.current_price)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Typography>
          </TableContainer>
          <TablePagination
            page={page}
            rowsPerPage={3}
            rowsPerPageOptions={[3]}
            count={portfolio.currentHoldings.length}
            component="div"
            onPageChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
}

export default PortfolioHoldings;
