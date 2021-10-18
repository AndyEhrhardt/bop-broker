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


  function PortfolioHoldings() {
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
      <div>
    {portfolio.currentMoney === undefined || portfolio.currentHoldings.length === 0 ?(
        <></>
      ) : (
    <div className={"table"}>
              <TableContainer>
                <Typography component={'span'}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
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
                          Rank
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "roboto",
                            fontWeight: 500,
                            fontSize: 15,
                          }}
                          className={classes.portTableCellSongArtist}
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
                      {portfolio.currentHoldings.slice(page, page + 3).map((track, index) => (
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
                            sx={{paddingRight: 1.3,
                              paddingLeft: 1.5,                           
                             }}>
                            {track.current_rank}
                            <Button
                              onClick={() =>
                                handleSell(track, track.current_price)
                              }
                            >
                              Sell
                            </Button>
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
                {portfolio.currentHoldings.length > 3 && 
                <TablePagination
                  page={page}
                  rowsPerPage={3}
                  rowsPerPageOptions={[]}
                  count={portfolio.currentHoldings.length}
                  component="div"
                  onPageChange={handleChangePage}
                />
              }
              </TableContainer>
            </div>
      )}
      </div>
  )}

  export default PortfolioHoldings;
