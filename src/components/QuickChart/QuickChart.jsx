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
import useSmallStyles from './smallerChart';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import { ContactlessOutlined } from '@material-ui/icons';



function QuickChart(props) {
    let classes;
    const history = useHistory();
    const chart = useSelector(store => store[props.reducer].slice(props.sliceStart, props.sliceStart + 50));
    const [page, setPage] = useState(0);
    const [elev, setElev] = useState(4);
    const handleRowClick = (event) => {
        console.log("in handle row click ", event)
        history.push(`/songdetails/${event}`)
    }

    if(props.smallerWidth){
        console.log("smaller?")
        classes = useSmallStyles();
    } else {
        classes = useStyles();
    }


    const handleChangePage = (event, newPage)=> {
        setPage(newPage)
    }

    const mouseEnter = () => {
        setElev(12)
    }

    const mouseLeave = () => {
        setElev(4)
    }

    return (
        <>
        <Paper 
        className={classes.quickChartWrapper} 
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave} 
        elevation={elev}
        >
                <h2 className={classes.quickChartTitle}>
                    {props.chartName}
                </h2>
                <div className={"table"}>
                    {chart.length === 0 ? <p>Loading</p> : 
                        <TableContainer>
                            <Typography component={'span'}>
                            <Table
                                size="small"
                            >
                                <TableHead>
                                    <TableRow  >
                                        <TableCell align="left" 
                                        sx={{ paddingRight: 1.3, paddingLeft: 1 , width: .1, 
                                        maxWidth: .3, fontFamily: 'roboto', fontWeight: 500, 
                                        fontSize: 15}}>
                                            Rank
                                        </TableCell>
                                        <TableCell sx={{fontFamily: 'roboto', fontWeight: 500, fontSize: 15}} 
                                        className={classes.tableCellSongArtist} 
                                        align="right">
                                            Song/Arist
                                        </TableCell>
                                        <TableCell className={classes.tableCellPrice} 
                                        sx={{fontFamily: 'roboto', fontWeight: 500, fontSize: 15}}
                                        align="right">
                                            Price
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {chart.slice(page*5, page*5+5).map((track) => (
                                       
                                            <TableRow 
                                            className={classes.tableRow}
                                            key={track.id}
                                            onClick={() => handleRowClick(track.concat)}
                                            sx={{ 'td, th': { paddingBottom: .35, paddingTop: .35, fontWeight: 400, cursor: 'pointer', } }}
                                            >
                                                    <TableCell align="left"
                                                    sx={{ paddingRight: 1.3, paddingLeft: 1.5 , width: .1, maxWidth: .3}}>
                                                        {track.rank}
                                                    </TableCell>
                                                    <TableCell sx={{ fontFamily: 'roboto', paddingRight: 1.3, paddingLeft: 1 }} 
                                                    align="right" className={classes.tableCellSongArtist}>
                                                        <a style={{fontWeight: 400, }}>
                                                            {track.song_name.split('(')[0]} 
                                                        </a>
                                                        <br/>
                                                        <i style={{fontWeight: 300, fontSize: 13}}>
                                                            {track.artist}
                                                        </i>
                                                    </TableCell>
                                                    <TableCell sx={{ paddingRight: 1.3, paddingLeft: 1 }} align="right">
                                                        ${track.price === 2500 ? "2.5k": track.price === 1250 ? "1.2k" : track.price}
                                                    </TableCell>
                                            </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            </Typography>
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
            </Paper>
            </>
    )
}

export default QuickChart;