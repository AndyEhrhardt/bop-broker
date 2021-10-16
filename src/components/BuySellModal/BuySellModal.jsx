import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import useStyles from "./modalStyles";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Fade from "@mui/material/Fade";

function BuySellModal(props) {
  const dispatch = useDispatch();
  const [sellState, setSellState] = useState(true);
  const [notEnoughSell, setNotEnoughSell] = useState(false);
  const [notEnoughBuy, setNotEnoughBuy] = useState(false);
  const classes = useStyles();
  const [numberOfShares, setNumberOfShares] = useState("");

  console.log("sellable quantity", props.track.quantity);

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
    <Modal
      open={props.modalPop}
      onClose={() => {
        props.setModalPop(false);
      }}
    >
      <div className={classes.paperWrap}>
        
          <Fade in={props.modalPop}>
            <div className={classes.innerModalWrap}>
            <Paper className={classes.modalPaper} elevation={16}>
            <div className={classes.addPadd}>
              <div className={classes.title}>
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
 

                <Typography sx={{ fontWeight: 300, fontSize: 30 }}>
                  Buy Shares
                </Typography>
              </div>
              <div className={classes.inputWrapper}>
                <Typography sx={{ fontWeight: 300, fontSize: 30 }}>
                  {sellState ? "Sell" : "Buy"}
                  <TextField
                    id="filled-basic"
                    label="# Of Shares"
                    variant="filled"
                    size="small"
                    value={numberOfShares}
                    min={1}
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    onChange={(event) => {
                      handleChange(event);
                    }}
                  />
                  Shares
                </Typography>
                <Typography sx={{ fontWeight: 300, fontSize: 30 }}>
                  For ${numberOfShares * props.track.current_price}
                </Typography>
              </div>
              <Button onClick={handleSellAll}>Sell All</Button>
              <div>
                {sellState ? (
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
              </Paper>
            </div>
          </Fade>
        
      </div>
    </Modal>
  );
}

export default BuySellModal;
