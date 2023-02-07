import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";


const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};




export default function MyBlogs() {
  return (
  <>     
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 300,
          height: 200,
        },
      }}
    >
<List sx={style} component="nav" aria-label="">
    <Link to="/paper">
            {" "}
          <ListItem button>
            <ListItemText primary="Write" />
          </ListItem>
          </Link>
          <Divider />
            <ListItem button divider>
              <ListItemText primary="MY Blogs" />
            </ListItem>
        </List>
      <Paper elevation={5} />
      <Paper elevation={5} />
      <Paper elevation={5} />
      <Paper elevation={5} />
      <Paper elevation={5} />
      <Paper elevation={5} />
    </Box>
   </>
  );
}
