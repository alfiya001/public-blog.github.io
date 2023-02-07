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
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const theme = createTheme();

export default function SignUp() {
  const [role, setRole] = React.useState('');
  const [msg, setMsg] = React.useState('');
  let navigate = useNavigate();
  
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log("data:"+data)
    // const newUser= JSON.parse(data)//
    axios.post('http://localhost:8090/register', data)
        .then(response => {
          console.log(response)
          document.getElementById("signup-form").reset();
          setMsg(<Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">Reistered :)  Login to continue!</Alert>
        </Stack>
        )
        })
        .catch(error => {
          setMsg(<Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="warning">Email Address already exists</Alert>
        </Stack>)
            // this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
        });
        console.log(data);
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
            Sign up
          </Typography>
          <Box component="form" noValidate id="signup-form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register("firstName", { required: "First Name is required." })}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  {...register("lastName", { required: "Last Name is required." })}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register('email', {
                    required: '*Required',
                    pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please enter a valid email',
                    },
                  })}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register('password', {
                    required: '*Required',
                    pattern: {
                        value: /^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/,
                        message: <ul>
                          <li>Passwords must be at least 6 characters long.</li>
                          <li>Passwords must contain at least 1 Uppercase characters (A-Z)</li>
                          <li>Passwords must contain at least 1 lowercase characters (a-z)</li>
                          <li>Passwords must contain at least 1 Digits (0-9)</li>
                          <li>Passwords must contain at least 1 Special characters (@#$%&)</li>
                          </ul>
                    },
                  })}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl sx={{width: '100%', marginTop: '0.25rem' }} >
              <InputLabel id="role">Role</InputLabel>
              <Select
                labelId="role"
                fullWidth
                id="role"
                value={role}
                label="Role"
                {...register("role", { required: "Select role." })}
                  error={Boolean(errors.role)}
                  helperText={errors.role?.message}
                onChange={handleChange}
              >
                <MenuItem value='USER'>User</MenuItem>
                <MenuItem value='AUTHOR'>Author</MenuItem>
              </Select>
            </FormControl>
            
            </Grid>
              </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              {msg}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
 
}
