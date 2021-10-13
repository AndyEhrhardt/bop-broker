import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@mui/material/TablePagination';

import useStyles from '../styles/styles';

function QuickChart(props) {
    const [page, setPage] = useState(0);
    const chart = useSelector(store => store[props.reducer].slice(props.sliceStart, props.sliceStart + 50));
    console.log("sliced chart",chart)
    const classes = useStyles();
    const handleRowClick = (event) => {
        console.log("in handle row click ", event)
    }
    const handleChangePage = (event, newPage)=> {
        console.log(newPage);
        setPage(newPage)
        console.log(event)
    }
    return (
        <div className={"wrapper"}>
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
                                    <TableCell align="right">Rank</TableCell>
                                    <TableCell align="right"><div className={classes.songName}>Song/Arist</div></TableCell>
                                    <TableCell align="right">Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {chart.slice(page*5, page*5+5).map((track) => (
                                    <TableRow className={classes} key={track.id} onClick={() => handleRowClick(track.concat)}>
                                            <TableCell align="right">{track.rank}</TableCell>
                                            <TableCell align="right" className={"song-name"}>{track.song_name.split('(')[0]} <br></br>
                                            {track.artist}
                                            </TableCell>
                                            <TableCell align="right">{track.price}</TableCell>
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
    )
}

export default QuickChart;