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
    if (parseInt(event.target.value) > props.track.quantity && sellState) {
      setNotEnoughSell(true);
    } else if (
      event.target.value * props.price > props.buyingPower &&
      !sellState
    ) {
      setNotEnoughBuy(true);
    } else {
      setNotEnoughSell(false);
      setNotEnoughBuy(false);
    }
  };
  const handleBuySell = (buyOrSell) => {
    if (numberOfShares === props.track.quantity && buyOrSell) {
      dispatch({ type: "SELL_ALL_SHARES", payload: props.track });
      setNumberOfShares(0);
      props.setModalPop(false);
    } else {
      dispatch({
        type: "UPDATE_SHARE_QUANTITY",
        payload: props.track,
        sellState: sellState,
        numberOfShares: numberOfShares,
        price: props.price,
      });
      setNumberOfShares(0);
      props.setModalPop(false);
    }
  };
  const handleSellAll = () => {
    setNumberOfShares(props.track.quantity);
  };
  const changeTradeMode = (buySellMode) => {
    console.log("sell state is ", buySellMode);
    setSellState(buySellMode);
  };

  return (
      <div className={classes.buySellWrap}>
            <div>
            
            <div>
              <div className={classes.title}>
                {props.buyAndSell && 
                <>
                <Button
                  disabled={sellState}
                  onClick={() => changeTradeMode(true)}
                >
                  Sell Mode
                </Button>
                <Button
                  disabled={!sellState}
                  onClick={() => changeTradeMode(false)}
                >
                  Buy Mode
                </Button> 
                </>
                }   

                <Typography className={classes.buyTitle} sx={{ fontWeight: 300, fontSize: 30 }}>
                  Buy
                </Typography>
                <div className={classes.grayLine}></div>
              </div>
              <div className={classes.forInputBuyWrap}>
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
                  <div className={classes.inputPrice}>
                    <Typography sx={{ fontWeight: 300, fontSize: 20 }}>
                      For 
                    </Typography>
                    <Typography sx={{ fontWeight: 300, fontSize: 20 }}>
                    ${numberOfShares * props.track.current_price}
                    </Typography> 
                  </div>
              </div>
              {props.buyAndSell && sellState &&
              <Button onClick={handleSellAll}>Sell All</Button>
              } 
              <div className={classes.buttonDiv}>
                {props.buyAndSell && sellState ? (
                  <Button
                    disabled={notEnoughSell}
                    onClick={() => handleBuySell(sellState)}
                  >
                    Sell
                  </Button>
                ) : (
                  <Button
                    disabled={notEnoughBuy}
                    onClick={() => handleBuySell(sellState)}
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