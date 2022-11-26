import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from '../components/SignIn';
import SignUp from '../components/SignUp';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const paperStyle={width:500,margin:"20px auto"}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const SignInOutContainer=()=> {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={20} style={paperStyle}>
    <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
      <Tab label="Login" />
      <Tab label="Sign Up" />
      </Tabs>
      
      <TabPanel value={value} index={0}>
        <Login/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUp/>
      </TabPanel>
    
    </Paper>
  )
}

export default SignInOutContainer