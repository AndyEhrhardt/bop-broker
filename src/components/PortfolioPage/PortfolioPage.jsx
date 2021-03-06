import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import "@fontsource/roboto/300.css";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";

import portfolioStyles from "./portfolioStyles";
import BuySellModal from "../BuySellModal/BuySellModal";

import PortfolioHoldings from "./PortfolioHoldings";
import PortfolioGraph from "./PortfolioGraph";
import PortfolioOverview from "./PortfolioOverview";

function PortfolioPage(props) {
  const classes = portfolioStyles();
  const history = useHistory();
  const portfolio = useSelector((store) => store.portfolio);
  const [elev, setElev] = useState(16);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [modalPop, setModalPop] = useState(false);

  const handleClose = (event) => {
    event.preventDefault();
    props.setModalPortfolioOpen(false);
    console.log("please be false", props.modalPortfolioOpen);
    setTimeout(() => {
      props.setPortfolioOpen(false);
    }, 200);
  };

  return (
    <Modal
      open={props.portfolioOpen}
      onBackdropClick={(event) => handleClose(event)}
      disableAutoFocus={true}
    >
      <div
        className={props.modalPortfolioOpen ? "openModalWrap" : "shutItDown"}
      >
        <Paper className={classes.modalPaper} elevation={16}>
          {portfolio.currentMoney === undefined ? (
            <></>
          ) : (
            <div className={classes.alphaWrap}>
              <div className={classes.masterWrap}>
                <PortfolioOverview />

                <PortfolioGraph
                  color={portfolio.historicalTotal[0].value -
                    portfolio.historicalTotal[portfolio.historicalTotal.length-1].value > 0 ? "#06f202" :
                    portfolio.historicalTotal[0].value - 
                    portfolio.historicalTotal[portfolio.historicalTotal.length-1].value < 0 ? "#f71500" : "#e6bb00"}
                  histData={portfolio.historicalTotal}
                />
              </div>
              <div className={classes.holdingsmaster}>
                <PortfolioHoldings />
              </div>
            </div>
          )}
        </Paper>
      </div>
    </Modal>
  );
}

export default PortfolioPage;
