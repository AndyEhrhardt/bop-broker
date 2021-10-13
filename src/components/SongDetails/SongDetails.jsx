import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import useStyles from '../styles/styles';


function SongDetails() {
    const classes = useStyles();
    const {id} = useParams();
    const dispatch = useDispatch();
    const songDetails = useSelector(store => store.songDetails);
    console.log("the song details", songDetails)
    const [quantity, setQuantity] = useState(0)


    useEffect(() => {
        dispatch({ type: 'GET_SONG_DETAILS', payload: id });
    }, [dispatch]);

    const handleBuy = (event) => {
        console.log("handle buy", quantity);

        dispatch({ type: 'POST_PORTFOLIO', payload: songDetails.basicInfo[0], quantity: quantity });
    }
    const handleQuantityChange = (event) => {
        console.log(event.target.value)
        setQuantity(event.target.value)
    }
    return (
        <>
            {songDetails.allRanks === undefined ? <p>Loading</p> : 
            <div >
                <div className={classes.mainDetailsWrapper}>
                <h1 className={classes.detailsSongTitle}>{songDetails.basicInfo[0].song_name}</h1>
                <h2 className={classes.detailsArtist}>{songDetails.basicInfo[0].artist}</h2>
                <h3 className={classes.detailsRank}>Ranked #{songDetails.basicInfo[0].current_rank}</h3>
                <h3 className={classes.detailsSubRank}>On US Top 50 Daily</h3>
                </div>

            <input value={quantity} 
            onChange={(event) => handleQuantityChange(event)} 
            type={"numer"}></input>
            <Button 
            value={quantity} 
            onClick={handleBuy}>
                Buy
            </Button>
            
            
            
            
            </div>
            }
        </>
    )
}

export default SongDetails;