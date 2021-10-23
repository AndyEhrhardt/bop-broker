import React, { useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Fade from "@mui/material/Fade";
import ButtonBase from "@material-ui/core/ButtonBase";

function LoginPage() {
  const history = useHistory();
  const [elev, setElev] = useState(0);
  const [elev2, setElev2] = useState(0);

  const mouseEnter = () => {
    setElev(12);
  };

  const mouseLeave = () => {
    setElev(0);
  };
  const mouseEnter2 = () => {
    setElev(12);
  };

  const mouseLeave2 = () => {
    setElev(0);
  };

  return (
    <div className={"login-page"}>
     
          <div className={"logo-and-title"}>
            <img className={"logo"} src={"images/favicon5.png"} />
            <Typography
              sx={{
                fontWeight: 500,
                fontFamily: "roboto",
                fontSize: 65,
                paddingTop: 20,
                paddingLeft: 18,
                maxHeight: 30,
              }}
            >
              BopBroker
              <Typography
              sx={{
                fontWeight: 400,
                fontFamily: "roboto",
                fontSize: 30,
                paddingTop: 1.9,
                paddingLeft: .3,
                maxHeight: 30,
                maxWidth: 500,
              }}>
                Welcome to BopBroker,
                <br/>
                <Typography
              sx={{
                fontWeight: 300,
                fontFamily: "roboto",
                fontSize: 25,
                paddingTop: 1.6,
                paddingLeft: .3,
                maxHeight: 30,
                maxWidth: 500,
              }}>
                Where songs become stocks and tracks get traded. 
                
                </Typography>

              </Typography>
            </Typography>
          </div>
          <LoginForm />
      
    </div>
  );
}

export default LoginPage;
