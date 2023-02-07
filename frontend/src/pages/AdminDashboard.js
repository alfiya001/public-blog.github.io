import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const drawerWidth = 240;

export default function AdminDashboard() {
  let navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: "black" }}
      >
      <Header/>
        {/* <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar> */}
      </AppBar>
      <div>
      <Drawer
         PaperProps={{
            sx: {
              backgroundColor: " #e6e6e6"
            }
          }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />

        <List>
        <Divider sx={{ border: "1px solid #8c8c8c" }}/>
          <ListItem 
            button
            onClick={() => navigate('/user-list')} >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="User" />
          </ListItem>
          <Divider sx={{ border: "1px solid #8c8c8c" }}/>

          <ListItem 
          button
          onClick={() => navigate('/author-list')}>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Author" />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ border: "1px solid #8c8c8c" }}/>

          <ListItem 
          button
          onClick={() => navigate('/admin-blog-list')}>
            <ListItemButton>
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Blogs" />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ border: "1px solid #8c8c8c" }}/>
        </List>
        
      </Drawer>
      </div>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

