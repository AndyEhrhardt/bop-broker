import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Fade from "@mui/material/Fade";
import songStyles from "./songDetailsStyles";
import ButtonBase from "@material-ui/core/ButtonBase";

function BuyOnly(props) {
  const classes = songStyles();
  const dispatch = useDispatch();
  const [sellState, setSellState] = useState(true);
  const [notEnoughBuy, setNotEnoughBuy] = useState(false);
  const [numberOfShares, setNumberOfShares] = useState("");
  const [notNumber, setNotNumber] = useState(false);
  const [error, setError] = useState(false)
  const [confirmTrade, setConfirmTrade] = useState(false)

  const handleChange = (event) => {
    setNumberOfShares(event.target.value);
    let checkInput = `${event.target.value}`
    console.log(checkInput)
    console.log(checkInput.includes("e"))
    if (Number(event.target.value)*props.price > props.buyingPower) {
      setNotEnoughBuy(true);
    }
    if (!Number.isInteger(Number(event.target.value))){
      setError(true);
      setNotEnoughBuy(true);
    } 
    if (Number.isInteger(Number(event.target.value))){
      setError(false);
    if(Number(event.target.value)*props.price < props.buyingPower){
      setNotEnoughBuy(false);
    }
  }
};

  const handleBuy = (buyOrSell) => {
      console.log(numberOfShares)
      console.log(props.track.spotify_song_id + props.track.spotify_playlist_id)
      dispatch({ type: "POST_PORTFOLIO", payload: props.track.id, quantity: numberOfShares});
      dispatch({ type: "GET_SONG_DETAILS", payload: props.track.spotify_song_id + props.track.spotify_playlist_id })
      setNumberOfShares(0);
  };

  return (
      <div className={classes.buySellWrap}>
            
              <div className={classes.title}>
                <Typography className={classes.buyTitle} sx={{ fontWeight: 300, fontSize: 30 }}>
                  Buy
                </Typography>
                <div className={classes.grayLine}></div>
              </div>
              <div className={classes.forInputBuyWrap}>
                  <div className={classes.forAmount}>
                    <Typography sx={{ fontWeight: 300, fontSize: 20 }}>
                    Shares
                    </Typography>
                    <TextField
                          id="filled-basic"
                          variant="filled"
                          size="small"
                          value={numberOfShares}
                          min={1}
                          type={'number'}
                          inputProps={{ inputMode: "numeric", pattern: "[0-9]*", style: {fontSize: 20, paddingTop: 0} }}
                          sx={{maxWidth: 65}}
                          onChange={(event) => {
                            handleChange(event);
                          }}
                          error={notNumber}
                    />
                  </div>
                  <div className={classes.forAmount}>
                    <Typography sx={{ fontWeight: 300, fontSize: 20 }}>
                      For 
                    </Typography>
                    <Typography sx={{ fontWeight: 300, fontSize: 20 }}>
                    ${numberOfShares * props.track.current_price}
                    </Typography> 
                  </div>
              </div>
              <div className={classes.grayLine}></div>
              <div className={classes.forAmount}>
              <Typography sx={{ fontWeight: 300, fontSize: 15 }}>
              Buying Power
              </Typography>
              <Typography sx={{ fontWeight: 300, fontSize: 15 }}>
              {props.buyingPower}
              </Typography>
              </div>
              <div className={classes.buttonDiv}>
                  <ButtonBase
                  disabled={notEnoughBuy}
                  onClick={() => handleBuy()}
                  >
                  <Typography sx={{ fontWeight: 300, 
                    fontSize: 25,
                    postition: 'absolute',
                    border: "1px solid rgba(142, 142, 142, 0.47)",
                    borderRadius: '10px',
                    "&:hover": {
                      backgroundColor: 'rgba(57, 255, 35, 0.2)',
                      border: "1px solid #06f202",
                      borderRadius: '0px'
                    },
                    transition: '0.2s',
                    width: 80,
                    textAlign: 'center'               
                    }} className={classes.activeTypeButton}>
                    Buy
                  </Typography>
                  </ButtonBase>
            </div>    
      </div>

  );
}

export default BuyOnly;