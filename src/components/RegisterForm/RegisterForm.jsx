import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';

function RegisterForm() {
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
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
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
      </div>
      <div>
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
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
