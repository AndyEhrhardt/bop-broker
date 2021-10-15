import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import useStyles from "../styles/styles";
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
import Button from '@mui/material/Button';

function QuickPortfolio() {
  const classes = useStyles();
  const history = useHistory();
  const portfolio = useSelector((store) => store.portfolio);
  const [elev, setElev] = useState(4);
  const dispatch = useDispatch();

  const mouseEnter = () => {
    setElev(12);
  };

  const mouseLeave = () => {
    setElev(4);
  };

  const handleSell = (track) => {
    console.log(track)
    dispatch({ type: 'SELL_ALL_SHARES', payload: track});
  }
  return (
    <>
      <Paper
        className={classes.quickChartWrapper}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        elevation={elev}
      >
        {portfolio.currentMoney === undefined ? (
          <>loading</>
        ) : (
          <div className={classes.quickPortMaster}>
            <h2 className={classes.quickChartTitle}>Portfolio</h2>
            <div className={classes.quickSubTitle}>
              <Typography sx={{ fontWeight: 500 }}>Equity</Typography>
              <Typography sx={{ fontWeight: 500 }}>Returns</Typography>
            </div>
            <div className={classes.quickPortColMaster}>
              <div className={classes.quickPortGap}>
                <div className={classes.quickPortColInfoLeft}>
                  <Typography
                    className={classes.quickPortfolioInfo}
                    sx={{ fontWeight: 400 }}
                  >
                    Net
                  </Typography>
                  <Typography
                    className={classes.quickPortfolioInfo}
                    sx={{ fontWeight: 400 }}
                  >
                    Excess
                  </Typography>
                  <Typography
                    className={classes.quickPortfolioInfo}
                    sx={{ fontWeight: 400 }}
                  >
                    Assets
                  </Typography>
                </div>
                <div className={classes.quickPortColInfo}>
                  <Typography
                    className={classes.quickPortColRight}
                    sx={{ fontWeight: 300 }}
                  >
                    ${portfolio.currentMoney.total_cash}
                  </Typography>
                  <Typography
                    className={classes.quickPortColRight}
                    sx={{ fontWeight: 300 }}
                  >
                    ${portfolio.currentMoney.buying_power}
                  </Typography>
                  <Typography
                    className={classes.quickPortColRight}
                    sx={{ fontWeight: 300 }}
                  >
                    $
                    {portfolio.currentMoney.total_cash -
                      portfolio.currentMoney.buying_power}
                  </Typography>
                </div>
              </div>
              <div className={classes.divider}></div>
              <div className={classes.quickPortGap}>
                <div className={classes.quickPortColInfoLeft}>
                  <Typography
                    className={classes.quickPortfolioInfo}
                    sx={{ fontWeight: 400 }}
                  >
                    Gain $
                  </Typography>
                  <Typography
                    className={classes.quickPortfolioInfo}
                    sx={{ fontWeight: 400 }}
                  >
                    Gain %
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
                    sx={{ fontWeight: 300 }}
                  >
                    $1,000
                  </Typography>
                  <Typography
                    className={classes.quickPortColRight}
                    sx={{ fontWeight: 300 }}
                  >
                    $500
                  </Typography>
                  <Typography
                    className={classes.quickPortColRight}
                    sx={{ fontWeight: 300 }}
                  >
                    $500
                  </Typography>
                </div>
              </div>
            </div>
            <TableContainer>
              <Typography>
                <div className={classes.quickSubTableTitle}>
                  <Typography sx={{ fontWeight: 500, fontSize: 18 }}>Holdings</Typography>
                </div>
                <Table size="small">
                  <TableHead>
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
                        }}
                        className={classes.tableCellSongArtist}
                        align="right"
                      >
                        Song/Arist
                      </TableCell>
                      <TableCell
                        className={classes.tableCellPrice}
                        sx={{
                          fontFamily: "roboto",
                          fontWeight: 500,
                          fontSize: 15,
                        }}
                        align="right"
                      >
                        Value
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {portfolio.currentHoldings.map((track) => (
                      <TableRow
                        className={classes.tableRow}
                        key={track.id}
                        sx={{
                          "td, th": {
                            paddingBottom: 0.35,
                            paddingTop: 0.35,
                            fontWeight: 400,
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
                          <Button onClick={()=> handleSell(track)}>Sell</Button>
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
                        </TableCell>
                        <TableCell
                          sx={{ paddingRight: 1.3, paddingLeft: 1 }}
                          align="right"
                        >
                          $
                          {track.current_price === 2500
                            ? "2.5k"
                            : track.current_price === 1250
                            ? "1.2k"
                            : track.current_price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Typography>
            </TableContainer>
            <TablePagination
              page={1}
              rowsPerPage={3}
              rowsPerPageOptions={[3]}
              count={3}
              component="div"
            />
          </div>
        )}
      </Paper>
    </>
  );
}

export default QuickPortfolio;
