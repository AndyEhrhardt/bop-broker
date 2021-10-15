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
    const [sellBuy, setSellBuy] = useState(true)
    const classes = useStyles();
    const [numberOfShares, setNumberOfShares] = useState('')
    console.log(props.track)

    const handleChange = (event) => {
        setNumberOfShares(event.target.value)
        console.log(numberOfShares)
    }
    const handleBuySell = (buyOrSell) => {
        

    }
    return (
        <Paper>
            <Modal
                open={props.modalPop}
                onClose={() => {props.setModalPop(false)}}
            >
                <div className={classes.innerModalWrap}>
                    <div className={classes.title}>
                    <Typography sx={{ fontWeight: 300, fontSize: 30 }}>
                        Sell Shares
                    </Typography>
                    <Typography sx={{ fontWeight: 300, fontSize: 30 }}>
                         Buy Shares
                    </Typography>
                    </div>
                    <div className={classes.inputWrapper}>
                    <Typography sx={{ fontWeight: 300, fontSize: 30 }}>
                        Sell 
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
                    <div>
                    <Button onClick={()=> handleBuySell(sellBuy)}>Sell</Button><Button onClick={()=> handleBuySell(sellBuy)}>Buy</Button>
                    </div>
                </div>
            </Modal>
        </Paper>
    )
}

export default BuySellModal;