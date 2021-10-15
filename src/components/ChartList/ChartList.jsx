import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuickChart from '../QuickChart/QuickChart'
import QuickPortfolio from '../QuickPortfolio/QuickPortfolio'
import useStyles from '../styles/styles';
import Typography from '@mui/material/Typography';

function ChartList() {
const chartNamesObj = {
        '37i9dQZEVXbMDoHDwVN2tF': "Global",
        '37i9dQZEVXbLRQDuF5jeBp': "US",
        '37i9dQZEVXbMXbN3EUUhlg': "Brazil",
        '37i9dQZEVXbKXQ4mDTEBXq': "Japan",
        '37i9dQZEVXbNFJfN1Vw8d9': "Spain",
        '37i9dQZEVXbObFQZ3JLcXt': "Indonesia",
        '37i9dQZEVXbMMy2roB9myp': "Argentina",
        '37i9dQZEVXbO3qyFxbkOE1': "Mexico",
        '37i9dQZEVXbKCF6dqVpDkS': "Netherlands",
        '37i9dQZEVXbJiZcmkrIHGU': "Germany",
        '37i9dQZEVXbIQnj7RRhdSX': "Italy",
        '37i9dQZEVXbNOUPGj7tW6T': "Paraguay",
        '37i9dQZEVXbL0GavIqMTeb': "Chile",
        '37i9dQZEVXbNBz9cRCSFkY': "Philippines",
        '37i9dQZEVXbIVYVBNw9D5K': "Turkey",
        '37i9dQZEVXbLoATJ81JYXz': "Sweden",
        '37i9dQZEVXbOa2lmxNORXQ': "Columbia",
        '37i9dQZEVXbJvfa0Yxg7E7': "Norway",
        '37i9dQZEVXbIPWwFssbupI': "France",
        '37i9dQZEVXbJPcfkRz0wJ0': "Australia"
    }
  const chartIdArray = [
    '37i9dQZEVXbMDoHDwVN2tF', 
    '37i9dQZEVXbLRQDuF5jeBp',
    '37i9dQZEVXbMXbN3EUUhlg', 
    '37i9dQZEVXbKXQ4mDTEBXq', 
    '37i9dQZEVXbNFJfN1Vw8d9', 
    '37i9dQZEVXbObFQZ3JLcXt', 
    '37i9dQZEVXbMMy2roB9myp', 
    '37i9dQZEVXbO3qyFxbkOE1', 
    '37i9dQZEVXbKCF6dqVpDkS', 
    '37i9dQZEVXbJiZcmkrIHGU', 
    '37i9dQZEVXbIQnj7RRhdSX', 
    '37i9dQZEVXbNOUPGj7tW6T', 
    '37i9dQZEVXbL0GavIqMTeb', 
    '37i9dQZEVXbNBz9cRCSFkY', 
    '37i9dQZEVXbIVYVBNw9D5K', 
    '37i9dQZEVXbLoATJ81JYXz', 
    '37i9dQZEVXbOa2lmxNORXQ', 
    '37i9dQZEVXbJvfa0Yxg7E7', 
    '37i9dQZEVXbIPWwFssbupI', 
    '37i9dQZEVXbJPcfkRz0wJ0'
  ]
  const dispatch = useDispatch();
  const classes = useStyles();
  const charts = useSelector((store) => store.user);
  const chart = useSelector(store => store.allCharts);

  return (
    <div className="container">
      <div className={classes.quickComponentsContainer}>
        {chartIdArray.map((chart, index) => (
            <>
             <QuickChart chartName={"Global"} sliceStart={0} reducer={"allCharts"}/>
            </>
        ))}
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ChartList;


