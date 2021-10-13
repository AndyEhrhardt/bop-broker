import React, { useState } from 'react';
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
import useStyles from '../styles/styles';




function SongDetails() {
    const {id} = useParams();
    console.log('in song details id:',id)
    
    return (
        <>
            <h1>ON SONG DETAILS</h1>
        </>
    )
}

export default SongDetails;