import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm } from "react-hook-form";
import { userLogin } from "../api/authenticationService";
import { useNavigate } from "react-router-dom";
// import { Alert } from "react-bootstrap";
import { isLoggedin } from "./Constant";
import {  useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { getToken } from "../api/authenticationService";

const theme = createTheme();

export default function SignIn() {
  const [role, setRole] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  let navigate = useNavigate();
  // localStorage.setItem("tagid", 0)
  useEffect(() => {
    console.log("loggedIN: ",localStorage.getItem("loggedIn"))
    let i =localStorage.getItem("loggedIn");
    if(i==true) {
      console.log("loggedIN: ",localStorage.getItem("loggedIn"))
      navigate(`/`);
    }
   
  }, []);
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit  = (data) =>  {
    // event.preventDefault();
    console.log(data)
    // const data = new FormData(event.currentTarget);
    console.log({
      email: data['email'],
      password: data['password'],
      role: data['role'],
    });

    userLogin(data)
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          localStorage.setItem("USER_KEY", response.data.message);
          localStorage.setItem("loggedIn", true)
          localStorage.setItem("email", data['email'])
          localStorage.setItem("userrole", data['role'])
          localStorage.setItem("tag",0)
          console.log(isLoggedin)
          navigate("/");
        } else {
          setErrorMessage(<Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="warning">Email Address and Password doesn't match</Alert>
            </Stack>);
        }
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 401:
              console.log("401 status");
              setErrorMessage("Authentication Failed.Bad Credentials");
              break;
            default:
              setErrorMessage(<Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="warning">Email Address and Password doesn't match</Alert>
            </Stack>);
          }
        } else {
          setErrorMessage("Something Wrong!Please Try Again");
        }
      });
  };

  console.log(errors);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email', {
                required: 'Email is required',
                pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email',
                },
            })}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', {
                required: '*Required',
                pattern: {
                    value: /^.*(?=.{4,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/,
                    message: <ul>
                          <li>Passwords must be at least 6 characters long.</li>
                          <li>Passwords must contain at least 1 Uppercase characters (A-Z)</li>
                          <li>Passwords must contain at least 1 lowercase characters (a-z)</li>
                          <li>Passwords must contain at least 1 Digits (0-9)</li>
                          <li>Passwords must contain at least 1 Special characters (@#$%&)</li>
                          </ul>,
                },
              })}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
            />
            <FormControl sx={{ width: '100%', marginTop: '1rem' }} >
              <InputLabel id="role">Role</InputLabel>
              <Select
                name="role"
                labelId="role"
                id="role"
                value={role}
                label="Role"
                {...register("role", { required: "Select role." })}
                  error={Boolean(errors.role)}
                  helperText={errors.role?.message}
                onChange={handleChange}
              >
                <MenuItem value='USER' selected>User</MenuItem>
                <MenuItem value='AUTHOR'>Author</MenuItem>
                <MenuItem value='ADMIN'>Admin</MenuItem>
              </Select>
            </FormControl>
            <Grid container justifyContent="flex-end">
              {errorMessage}
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}