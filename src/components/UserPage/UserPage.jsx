import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuickChart from '../QuickChart/QuickChart'
import QuickPortfolio from '../QuickPortfolio/QuickPortfolio'
import useStyles from '../styles/styles';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';

function UserPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'GET_ALL_CHARTS'});
    dispatch({type: 'GET_PORTFOLIO'});
  }, [dispatch]);

  const toChart = () => {
    history.push('/chartlist')
  }

  
  return (
    <div className="container">
      <button onClick={toChart}>chart list </button> 
      <div className={classes.quickComponentsContainer}>
        <QuickChart chartName={"Global"} sliceStart={0} reducer={"allCharts"} smallerWidth={false}/>
        <QuickPortfolio />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
