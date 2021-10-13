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

function QuickChart(props) {
    const classes = useStyles();
    const history = useHistory();
    const chart = useSelector(store => store[props.reducer].slice(props.sliceStart, props.sliceStart + 50));
    console.log("sliced chart",chart);
    const [page, setPage] = useState(0);
    
    
    const handleRowClick = (event) => {
        console.log("in handle row click ", event)
        history.push(`/songdetails/${event}`)
    }
    const handleChangePage = (event, newPage)=> {
        console.log(newPage);
        setPage(newPage)
        console.log(event)
    }
    const elevationChange = () => {

    }


    return (
        <Paper className={classes.quickChartWrapper} elevation={5}>
            <div >
                <h2 className={classes.quickChartTitle}>
                    {props.chartName}
                </h2>
                <div className={"table"}>
                    {chart.length === 0 ? <p>Loading</p> : 
                        <TableContainer>
                            <Table
                                size="small"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" sx={{ paddingRight: 1.3, paddingLeft: 1 , width: .1, maxWidth: .3}}>Rank</TableCell>
                                        <TableCell className={classes.tableCellSongArtist} align="right">Song/Arist</TableCell>
                                        <TableCell className={classes.tableCellPrice} align="right">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {chart.slice(page*5, page*5+5).map((track) => (
                                        <TableRow className={classes.tableRow} 
                                        key={track.id} 
                                        onClick={() => handleRowClick(track.concat)}
                                        sx={{ 'td, th': { paddingBottom: .35, paddingTop: .35 } }}
                                        >
                                                <TableCell align="left" sx={{ paddingRight: 1.3, paddingLeft: 1.5 , width: .1, maxWidth: .3}}>{track.rank}</TableCell>
                                                <TableCell sx={{ paddingRight: 1.3, paddingLeft: 1 }} align="right" className={classes.tableCellSongArtist}>{track.song_name.split('(')[0]} <br></br>
                                                {track.artist}
                                                </TableCell>
                                                <TableCell sx={{ paddingRight: 1.3, paddingLeft: 1 }} align="right">
                                                    ${track.price === 2500 ? "2.5k": track.price === 1250 ? "1.2k" : track.price}
                                                </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                    <TablePagination
                    page={page}
                    rowsPerPage={5}
                    rowsPerPageOptions={[5]}
                    count={50}
                    component="div"
                    onPageChange={handleChangePage}
                    />
                </div>
            </div>
        </Paper>
    )
}

export default QuickChart;