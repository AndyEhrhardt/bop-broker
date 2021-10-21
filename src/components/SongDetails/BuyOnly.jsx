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

function BuyOnly(props) {
  const classes = songStyles();
  const dispatch = useDispatch();
  const [sellState, setSellState] = useState(true);
  const [notEnoughBuy, setNotEnoughBuy] = useState(false);
  const [numberOfShares, setNumberOfShares] = useState("");
  const [notNumber, setNotNumber] = useState(false);

  const handleChange = (event) => {
    setNumberOfShares(event.target.value);
    let checkInput = `${event.target.value}`
    console.log(checkInput)
    console.log(checkInput.includes("e"))
    if (parseInt(event.target.value)*props.price > props.buyingPower) {
      setNotEnoughBuy(true);
    } else if (parseInt(event.target.value) === NaN){
        setNotEnoughBuy(true);
        setNotNumber(true)
    } else {
      setNotEnoughBuy(false);
    }
  };

  const handleBuy = (buyOrSell) => {
      console.log(numberOfShares)
      dispatch({ type: "POST_PORTFOLIO", payload: props.track.id, quantity: numberOfShares});
      setNumberOfShares(0);
  };

  return (
      <div className={classes.buySellWrap}>
            <div>
            
            <div>
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
                          sx={{maxWidth: 50}}
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
              <div className={classes.buttonDiv}>
                  <Button
                    disabled={notEnoughBuy}
                    onClick={() => handleBuy()}
                  >
                    Buy
                  </Button>
              </div>
              </div>
            </div>    
      </div>

  );
}

export default BuyOnly;