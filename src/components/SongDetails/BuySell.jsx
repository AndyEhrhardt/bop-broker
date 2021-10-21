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

function BuySell(props) {
  const classes = songStyles();
  const dispatch = useDispatch();
  const [sellState, setSellState] = useState(true);
  const [notEnoughSell, setNotEnoughSell] = useState(false);
  const [notEnoughBuy, setNotEnoughBuy] = useState(false);
  const [numberOfShares, setNumberOfShares] = useState("");
  


  const handleChange = (event) => {
    setNumberOfShares(event.target.value);
    console.log(parseInt(event.target.value));
    console.log(props.quantity, "quantity")
    if (parseInt(event.target.value) > props.quantity) {
      setNotEnoughSell(true);
    } else if (event.target.value * props.price > props.buyingPower) {
      setNotEnoughBuy(true);
    } else {
      setNotEnoughSell(false);
      setNotEnoughBuy(false);
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
            <div>
            
            <div>
              <div className={classes.title}>
                <>
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
                </>
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
                          min={1}
                          inputProps={{ inputMode: "numeric", pattern: "[0-9]*", style: {fontSize: 20, paddingTop: 0} }}
                          sx={{maxWidth: 50}}
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
              {props.buyAndSell && sellState &&
              <Button onClick={handleSellAll}>Sell All</Button>
              } 
              <div className={classes.buttonDiv}>
              {sellState ? (
                  <Button
                    disabled={notEnoughSell}
                    onClick={() => handleBuySell()}
                  >
                    Sell
                  </Button>
                ) : (
                  <Button
                    disabled={notEnoughBuy}
                    onClick={() => handleBuySell()}
                  >
                    Buy
                  </Button>
                )}
              </div>
              </div>
            </div>    
      </div>

  );
}

export default BuySell;