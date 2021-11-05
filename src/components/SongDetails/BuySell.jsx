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

function BuySell(props) {
  const classes = songStyles();
  const dispatch = useDispatch();
  const [sellState, setSellState] = useState(true);
  const [notEnoughSell, setNotEnoughSell] = useState(false);
  const [notEnoughBuy, setNotEnoughBuy] = useState(false);
  const [numberOfShares, setNumberOfShares] = useState("");
  const [error, setError] = useState(false);
  const [confirmTrade, setConfirmTrade] = useState(false)

  const handleChange = (event) => {
    setNumberOfShares(event.target.value);
    console.log(Number.isInteger(Number(event.target.value)));
    if (parseInt(event.target.value) < props.quantity) {
      setNotEnoughSell(false);
    } 
    if (parseInt(event.target.value) > props.quantity) {
      setNotEnoughSell(true);
    } 
    if (Number(event.target.value) * props.price < props.buyingPower) {
      setNotEnoughBuy(false);
    } 
    if (Number(event.target.value) * props.price > props.buyingPower) {
      setNotEnoughBuy(true);
    } 
    if (!Number.isInteger(Number(event.target.value))){
      setError(true);
      setNotEnoughBuy(true);
      setNotEnoughSell(true);
    } 
    if (Number.isInteger(Number(event.target.value))){
      setError(false);
    } 
  };
  const handleBuySell = () => {
    if (parseInt(numberOfShares) === props.track.quantity && sellState) {
      dispatch({ type: "SELL_ALL_SHARES", payload: props.track });
      dispatch({ type: "GET_SONG_DETAILS", payload: props.track.spotify_song_id + props.track.spotify_playlist_id });
      setNumberOfShares(0);
    } else {
      console.log(props.track, sellState, numberOfShares, props.track.current_price)
      dispatch({
        type: "UPDATE_SHARE_QUANTITY",
        payload: props.track,
        sellState: sellState,
        numberOfShares: numberOfShares,
        price: props.track.current_price,
      });
      dispatch({ type: "GET_SONG_DETAILS", payload: props.track.spotify_song_id + props.track.spotify_playlist_id })
      setNumberOfShares(0);
    }
  };
  const handleSellAll = () => {
    setNumberOfShares(props.track.quantity);
  };

  return (
      <div className={classes.buySellWrap}>
              <div className={classes.title}>
                <div className={classes.changeMode}>
                
                <Button
                  className={classes.buyTitle} sx={{ fontWeight: 300, fontSize: 20, height: 30 }}
                  color="success"
                  variant={sellState ? "contained" : "outlined"}
                  onClick={() => setSellState(true)}
                >
                  Sell
                </Button>
                <Button
                  className={classes.buyTitle} sx={{ fontWeight: 300, fontSize: 20 , height: 30}}
                  color="success"
                  variant={!sellState ? "contained" : "outlined"}
                  onClick={() => setSellState(false)}
                >
                  Buy
                </Button> 
                </div>
                <div className={classes.grayLine}></div>
              </div>
              <div className={classes.forInputBuyWrap}>
                {sellState ? 
                <Typography sx={{ fontWeight: 300, fontSize: 20, textAlign: 'center' }}>
                  Sell
                </Typography>
                :
                <Typography sx={{ fontWeight: 300, fontSize: 20, textAlign: 'center' }}>
                  Buy
                </Typography>
                } 
                  <div className={classes.inputPrice}>
                    <Typography sx={{ fontWeight: 300, fontSize: 20 }}>
                    Shares
                    </Typography>
                    <TextField
                          id="filled-basic"
                          variant="filled"
                          size="small"
                          value={numberOfShares}
                          error={error}
                          min={1}
                          inputProps={{ inputMode: "numeric", pattern: "[0-9]*", style: {fontSize: 20, paddingTop: 0} }}
                          sx={{maxWidth: 65}}
                          onChange={(event) => {
                            handleChange(event);
                          }}
                    />
                    
                  </div>
                  <div className={classes.forAmount}>
                    <Typography sx={{ fontWeight: 300, fontSize: 20 }}>
                      For 
                    </Typography>
                    <Typography sx={{ fontWeight: 300, fontSize: 20, textAlign: 'right' }}>
                    ${numberOfShares * props.track.current_price}
                    </Typography> 
                  </div>
              </div>
              {/* { sellState &&
              <Button onClick={handleSellAll}>Sell All</Button>
              }  */}

              <div className={classes.grayLine}></div>
              
              {sellState ? 
              <div className={classes.forAmount}>
              <Typography sx={{ fontWeight: 300, fontSize: 15 }}>
              Available
              </Typography>
              <Typography sx={{ fontWeight: 300, fontSize: 15 }}>
              {props.quantity}
              </Typography>
              </div>
              : 
              <div className={classes.forAmount}>
              <Typography sx={{ fontWeight: 300, fontSize: 15 }}>
              Buying Power
              </Typography>
              <Typography sx={{ fontWeight: 300, fontSize: 15 }}>
              ${props.buyingPower}
              </Typography>
              </div>
              }


              <div className={classes.buttonDiv}>
              {sellState ? (
                  <ButtonBase
                  disabled={notEnoughSell}
                    onClick={() => handleBuySell()}
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
                    Sell
                  </Typography>
                  </ButtonBase>
                ) : (
                  <ButtonBase
                  disabled={notEnoughBuy ? true : props.track.current_price > props.buyingbuyingPower ? true : false}
                  onClick={() => handleBuySell()}
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
                )}
              </div>
            
    
        
      </div>

  );
}

export default BuySell;