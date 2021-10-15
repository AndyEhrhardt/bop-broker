import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";


import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import useStyles from "./modalStyles";
import TextField from '@mui/material/TextField';

function BuySellModal(props){
    const dispatch = useDispatch();
    const [sellState, setSellState] = useState(true)
    const classes = useStyles();
    const [numberOfShares, setNumberOfShares] = useState('')
    console.log(props.track)

    const handleChange = (event) => {
        setNumberOfShares(event.target.value)
        console.log(numberOfShares)
    }
    const handleBuySell = (buyOrSell) => {
        if (numberOfShares === props.track.quantity && buyOrSell){
            dispatch({ type: 'SELL_ALL_SHARES', payload: props.track});
        } else {
            dispatch({ type: 'UPDATE_SHARE_QUANTITY', 
            payload: props.track, 
            sellState: sellState, 
            numberOfShares: numberOfShares,
            price: props.price});
        } 
    }
    const handleSellAll = () =>{
        setNumberOfShares(props.track.quantity)
    }
    const changeTradeMode = (buySellMode) => { 
        console.log("sell state is ", buySellMode)
        setSellState(buySellMode)
    }

    return (
        <Paper>
            <Modal
                open={props.modalPop}
                onClose={() => {props.setModalPop(false)}}
            >
                <div className={classes.innerModalWrap}>
                    <div className={classes.title}>
                    <Button disabled={sellState}
                    onClick={() => changeTradeMode(true)}>
                        Sell Mode
                    </Button>
                    <Button disabled={!sellState}
                    onClick={()=> changeTradeMode(false)}>
                        Buy Mode
                    </Button>
                    
                        <Typography sx={{ fontWeight: 300, fontSize: 30 }}>
                            Sell Shares
                        </Typography>
                    
                        <Typography sx={{ fontWeight: 300, fontSize: 30 }}>
                            Buy Shares
                        </Typography>
                   
                    </div>
                    <div className={classes.inputWrapper}>
                    <Typography sx={{ fontWeight: 300, fontSize: 30 }}>
                    {sellState ? "Sell" : "Buy" }
                            <TextField id="filled-basic" 
                            type="number"
                            label="# Of Shares" 
                            variant="filled" 
                            size="small"
                            value={numberOfShares}
                            onChange={(event) => {handleChange(event)}}/> 
                        Shares
                    </Typography>
                    <Typography sx={{ fontWeight: 300, fontSize: 30 }}>
                        For ${numberOfShares * props.track.current_price}
                    </Typography>
                    </div>
                    <Button onClick={handleSellAll}>Sell All</Button>
                    <div>
                    {sellState ? 
                        <Button onClick={()=> handleBuySell(sellState)}>Sell</Button>
                    :
                        <Button onClick={()=> handleBuySell(sellState)}>Buy</Button>
                    }   
                    </div>
                </div>
            </Modal>
        </Paper>
    )
}

export default BuySellModal;