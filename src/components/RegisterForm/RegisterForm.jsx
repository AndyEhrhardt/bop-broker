import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@mui/material/Button";

function RegisterForm(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
     <div className={"login-no-register"}>
      <Typography sx={{
      fontFamily: "roboto",
      fontWeight: 400,
      fontSize: 23,
      minWidth: 200,
      }}
      >
        Register
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
              onClick={(event) => registerUser(event)}
            >   
            <Typography sx={{
              fontFamily: "roboto",
              fontWeight: 400,
              fontSize: 25,
              color: 'black',
              textAlign: 'right'
            }}>
                Register
            </Typography>
            </Button>
            
            <Button
              onHover={"contained"}
              sx={{
                fontFamily: "roboto",
                fontWeight: 400,
                fontSize: 15,
                color: 'black',
                textAlign: 'right'
                }}
              onClick={() => {
                props.setLoginOrRegister(true)
              }}>   
               Login
            </Button>
    </div>
  );
}

export default RegisterForm;
