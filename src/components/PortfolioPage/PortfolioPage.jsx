import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import "@fontsource/roboto/300.css";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";


import portfolioStyles from "./portfolioStyles";
import BuySellModal from "../BuySellModal/BuySellModal";

import PortfolioHoldings from "./PortfolioHoldings";
import PortfolioGraph from "./PortfolioGraph";
import PortfolioOverview from './PortfolioOverview'

function PortfolioPage(props) {
  const classes = portfolioStyles();
  const history = useHistory();
  const portfolio = useSelector((store) => store.portfolio);
  const [elev, setElev] = useState(16);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [modalPop, setModalPop] = useState(false);
  const [buySellTrack, setBuySellTrack] = useState({});
  const [buySellPrice, setBuySellPrice] = useState(0);
 const [animateOpenClose, setAnimateOpenClose] = useState(true);
  const mouseEnter = () => {
    setElev(12);
  };

  const mouseLeave = () => {
    setElev(4);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSell = (track, price) => {
    console.log(track, price);
    setBuySellTrack(track);
    setBuySellPrice(price);
    setModalPop(true);
    //dispatch({ type: 'SELL_ALL_SHARES', payload: track});
  };
  const handleClose = () => {
    setAnimateOpenClose(false)
    setTimeout(() => {props.setPortfolioOpen(false)}, 300)
  }
  const handleOpen = () => {
    setAnimateOpenClose(true)
  }
console.log(animateOpenClose)
  return (
    <Modal
    open={props.portfolioOpen}
    onClose={() => handleClose()}
    onOpen={() => handleOpen()}
    >  
    <div className={animateOpenClose ? ("openModalWrap"): ("closeModalWrao")}>
      {portfolio.currentMoney === undefined ? (
        <></>
      ) : (
        <div className={classes.alphaWrap}>
        <div className={classes.masterWrap}>
               
              <PortfolioOverview/>



              
                <PortfolioGraph
                  color={portfolio.gains}
                  histData={portfolio.historicalTotal}
                />
              
        </div>
        <div className={classes.holdingsmaster}>
                    <PortfolioHoldings />
        </div>
        </div>
      )}
    </div>
    </Modal>
  );
}

export default PortfolioPage;
