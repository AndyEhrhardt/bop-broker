import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";

function LoginForm(props) {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const [elev, setElev] = useState(0);
  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  };
  const mouseEnter = () => {
    setElev(12);
  };

  const mouseLeave = () => {
    setElev(0);
  };

  return (
    <div className={"login-no-register"}>
      <Typography sx={{
      fontFamily: "roboto",
      fontWeight: 400,
      fontSize: 23,
      minWidth: 200,
      }}
      >
        Login
      </Typography>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
        <TextField
          type="text"
          name="username"
          required
          value={username}
          variant="standard"
          label="username"
          id="standard-basic"
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          type="password"
          name="password"
          required
          variant="standard"
          label="password"
          id="standard-basic"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        
          <Button
              onHover={"contained"}
              onClick={(event) => login(event)}
            >   
            <Typography sx={{
              fontFamily: "roboto",
              fontWeight: 400,
              fontSize: 25,
              color: 'black',
              textAlign: 'right'
            }}>
                Log In
            </Typography>
            </Button>
            
            <Button
              onHover={"contained"}
              onClick={(event) => login(event)}
              sx={{
                fontFamily: "roboto",
                fontWeight: 400,
                fontSize: 15,
                color: 'black',
                textAlign: 'right'
                }}
              onClick={() => {
                props.setLoginOrRegister(false)
              }}>   
               Register
            </Button>
            
    </div>
  );
}

export default LoginForm;
