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
    useEffect(() => {
        dispatch({ type: 'GET_SONG_DETAILS', payload: id });
    }, [dispatch]);

    return (
        <>
            {songDetails.allRanks === undefined ? <p>Loading</p> : 
            <div >
                <div className={classes.mainDetailsWrapper}>
                <h1 className={classes.detailsSongTitle}>{songDetails.basicInfo[0].song_name}</h1>
                <h2 className={classes.detailsArtist}></h2>
                </div>
            
            
            
            
            
            </div>
            }
        </>
    )
}

export default SongDetails;