import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import useStyles from '../styles/styles';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/300.css';
import Paper from '@mui/material/Paper';


function QuickPortfolio() {
    const classes = useStyles();
    const history = useHistory();
    const portfolio = useSelector(store => store.portfolio);
    const [elev, setElev] = useState(4);
    const mouseEnter = () => {
        setElev(12)
    }

    const mouseLeave = () => {
        setElev(4)
    }

    return(
        <>
        <Paper className={classes.quickChartWrapper} 
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave} 
        elevation={elev}>
            {portfolio.currentMoney === undefined ? <p>loading</p> : 
        <>
        

            <h2 className={classes.quickChartTitle}>
            Portfolio
            </h2>
            <div className={classes.portfolioInfo}>
            <p>Net: </p>
            <p>Assets: </p>
            <p>Buying Power: </p>
            <p></p>
            <p></p>
            </div>
            </>
            }
        </Paper>
        </>
    )
}

export default QuickPortfolio;