import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";

import BuyOnly from "./BuyOnly";
import BuySell from "./BuySell";
import songStyles from "./songDetailsStyles";
import Modal from "@mui/material/Modal";
import DetailsGraph from "./DetailsGraph";


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


function SongDetails(props) {
  const classes = songStyles();
  const dispatch = useDispatch();
  const songDetails = useSelector((store) => store.songDetails);
  const portfolio = useSelector((store) => store.portfolio);
  const [songOwned, setSongOwned] = useState(false)
    const handleClose = () => {
        
        props.setSongDetailsOpen(false);
        setTimeout(() => {dispatch({ type: "CLEAR_SONG_DETAILS"})}, 450)
    }
  return (
    <Modal
      open={props.songDetailsOpen}
      onClose={() => {
        handleClose();
      }}
      disableAutoFocus={true}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.songDetailsOpen}>
      <div className={classes.innerModalWrap}>
        {songDetails.allRanks === undefined ? (
          <p>Loading</p>
        ) : (
          <div className={classes.graphDetailsBuy}>
            <div className={classes.buySellAndDetails}>
              <div className={classes.mainDetailsWrapper}>
                <Typography
                  sx={{ fontWeight: 500, fontSize: 25, fontFamily: "roboto" }}
                >
                  {songDetails.basicInfo[0].song_name}
                </Typography>
                <Typography
                  sx={{ fontWeight: 400, fontSize: 20, fontFamily: "roboto" }}
                >
                  {songDetails.basicInfo[0].artist}
                </Typography>

                <Typography
                  sx={{ fontWeight: 300, fontSize: 17, fontFamily: "roboto" }}
                >
                  Rank #{songDetails.basicInfo[0].current_rank}
                </Typography>
                <Typography
                  sx={{ fontWeight: 300, fontSize: 17, fontFamily: "roboto" }}
                >
                  On {props.chartName}
                </Typography>
                <Typography
                  sx={{ fontWeight: 300, fontSize: 17, fontFamily: "roboto" }}
                >
                  ${priceObject[songDetails.basicInfo[0].current_rank]}
                </Typography>
                
                  {songDetails.basicInfo[0].quantity === undefined ? <></> :
                  <Typography
                  sx={{ fontWeight: 300, fontSize: 17, fontFamily: "roboto" }}
                  >
                  # Of Shares 
                  Held: {songDetails.basicInfo[0].quantity}
                  </Typography>
                  }
              </div>
            {songDetails.owned ? 
            <BuySell 
            track={songDetails.basicInfo[0]}
            quantity={songDetails.quantity}
            price={songDetails.basicInfo[0].current_price}
            buyingPower={portfolio.currentMoney.buying_power}
            masterId={props.songDetailsId}
            /> 
            :
            <BuyOnly
            track={songDetails.basicInfo[0]}
            price={songDetails.basicInfo[0].current_price}
            buyingPower={portfolio.currentMoney.buying_power}
            masterId={props.songDetailsId}
            />
            }
            </div>  


            <DetailsGraph/> 

          </div>   
        )}
      </div>
      </Fade>
    </Modal>
  );
}

export default SongDetails;
