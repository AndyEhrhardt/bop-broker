import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuickChart from '../QuickChart/QuickChart'
import QuickPortfolio from '../QuickPortfolio/QuickPortfolio'
import useStyles from '../styles/styles';
import Typography from '@mui/material/Typography';

function UserPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch({ type: 'GET_ALL_CHARTS'});
    dispatch({type: 'GET_PORTFOLIO'});
  }, [dispatch]);
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <div className={classes.quickComponentsContainer}>
        <QuickChart chartName={"Global"} sliceStart={0} reducer={"allCharts"}/>
        <QuickPortfolio />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
