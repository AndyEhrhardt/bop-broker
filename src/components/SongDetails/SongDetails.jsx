import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";

import songStyles from "./songDetailsStyles";
import Modal from "@mui/material/Modal";
import DetailsGraph from "./DetailsGraph";

function SongDetails(props) {
  const classes = songStyles();
  const dispatch = useDispatch();
  const songDetails = useSelector((store) => store.songDetails);
  console.log("the song details", songDetails);
  const [quantity, setQuantity] = useState(0);

  //   useEffect(() => {
  //     dispatch({ type: "GET_SONG_DETAILS", payload: props.id });
  //     console.log("props id", props.id);
  //   }, [dispatch]);

    const handleClose = () => {
        dispatch({ type: "CLEAR_SONG_DETAILS"});
        props.setSongDetailsOpen(false);
    }


  return (
    <Modal
      open={props.songDetailsOpen}
      onClose={() => {
        handleClose();
      }}
      disableAutoFocus={true}
    >
      <div className={classes.innerModalWrap}>
        {songDetails.allRanks === undefined ? (
          <p>Loading</p>
        ) : (
          <div>
            <div className={classes.mainDetailsWrapper}>
              <Typography
                sx={{ fontWeight: 500, fontSize: 25, fontFamily: "roboto" }}
              >
                {songDetails.basicInfo[0].song_name}
              </Typography>
              <Typography
                sx={{ fontWeight: 400, fontSize: 20, fontFamily: "roboto" }}
              >
                {songDetails.basicInfo[0].artist}
              </Typography>

              <Typography
                sx={{ fontWeight: 300, fontSize: 17, fontFamily: "roboto" }}
              >
                Rank #{songDetails.basicInfo[0].current_rank}
              </Typography>
              <Typography
                sx={{ fontWeight: 300, fontSize: 17, fontFamily: "roboto" }}
              >
                On {props.chartName}
              </Typography>
            </div>




            <DetailsGraph/> 

          </div>
        )}
      </div>
    </Modal>
  );
}

export default SongDetails;
