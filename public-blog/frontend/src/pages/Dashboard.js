import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate, useLocation } from "react-router-dom";

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import AuthorDashboard from './AuthorDashboard';
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { getToken } from "../api/authenticationService";
import { useEffect } from "react";

import Write from './Write';
import AdminBlogList from './AdminBlogList';
import UserList from './UserList';
import AuthorList from './AuthorList';
import AuthorBlogList from './AuthorBlogList';
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  type1: {
    flexGrow: "1",
    textAlign: "justify",
  },
  type2: {
    marginLeft: theme.spacing(10),
    display: "flex",
    cursor: "pointer",
  },
}));

const drawerWidth = 240;

export default function Dashboard() {

  let navigate = useNavigate();
  const location = useLocation();
  const [pageChange,SetPageChange]=React.useState("write");
  const classes = useStyles();
  localStorage.setItem("tag", 0);

  const [tag, setTag] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  let role = localStorage.getItem("userrole");
    
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const handleChange = (event) => {
    localStorage.setItem("USER_KEY", "");
    navigate("/signin");
  };
  const handleChangeWrite = (event) => {
    navigate("/write");
  };
  const handleChangeDashboard = (event) => {
    navigate("/dashboard");
  };
  const handleTagChange = (event) => {
      
  };

  useEffect(() => {
    if(role=="AUTHOR")
      SetPageChange("write");
    else if(role=="ADMIN")
      SetPageChange("user-list")
    getAllTag();
  }, []);
  const getAllTag = () => {
    axios.get(`http://localhost:8090/tag`, {
      headers: {
        authorization: "Bearer " + getToken(),

      },
    })
      .then(res => {
        setTag(res["data"]);
        console.log('Response tags ', res);
      }).catch(error => {
        console.error('There was an error!', error);
      });
  }

  const onSubmit = (data) => {
    setIsLoading(true);
    const reqdata = {
      title: data.title,
      description: data.description,
      tags: [{
        id: data.tag
      }]
    }
    console.log("data:",reqdata)
    const userid = localStorage.getItem("userid");
    axios.post(`http://localhost:8090/post/${userid}`,reqdata, {
      headers: {
        authorization: "Bearer " + getToken(),
        'Content-Type': 'application/json',
      },
    })
        .then(response => {
          console.log(response)
          if(localStorage.getItem("userrole")=="AUTHOR")
            SetPageChange("author-blog");
            // navigate("/author-blog-list") 
          else
            SetPageChange("blog-list");
            // navigate("/admin-blog-list") 
            setIsLoading(false);
            document.getElementById("write-blog").reset();
        })
        .catch(error => {
            // this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
        });
        data.target.reset();
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" className={classes.type1} noWrap component="div" onClick={(event) => {
            navigate(`/`);}}>
            Public Blog
          </Typography>
          {(() => {
          if (role != "USER") {
              return <div>
              <Typography
                variant="h6"
                color="textSecondary"
                className={classes.type2}
                onClick={handleChangeDashboard}
              >
                Dashboard&nbsp;
              </Typography>
            </div>;
            }
          })()}
          {/* {(() => {
            if (role == "ADMIN") {
              return <div>
              <Typography
                variant="h6"
                color="textSecondary"
                className={classes.type2}
                onClick={handleChangeDashboard}
              >
                Dashboard&nbsp;&nbsp;
              </Typography>
            </div>;
            } else if (role == "AUTHOR") {
              return <div>
              <Typography
                variant="h6"
                color="textSecondary"
                className={classes.type2}
                onClick={handleChangeWrite}
              >
                Write&nbsp;&nbsp;
              </Typography>
            </div>;
            } else {
              return <div></div>;
            }
          })()} */}
          <div>
          <Typography
            variant="h6"
            color="textSecondary"
            className={classes.type2}
            onClick={handleChange}
          > 
          Logout
          </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          {/* {console.log("role: ",role)} */}
        {(() => {
          if (role == "AUTHOR") {
          console.log("role: ",role)
          return <div>
          <List>
            {/* {['Write Blog', 'List of Blog', 'Send email', 'Drafts'].map((text, index) => ( */}
              <ListItem key="write-blog" disablePadding onClick={() => SetPageChange("write")}>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  </ListItemIcon>
                  <ListItemText primary="Write Blog" />
                </ListItemButton>
              </ListItem>
            {/* // ))} */}
          </List>
          <Divider />
          <List>
            {/* {['All mail', 'Trash', 'Spam'].map((text, index) => ( */}
              <ListItem key="blog-list" disablePadding onClick={() => SetPageChange("author-blog")}>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  </ListItemIcon>
                  <ListItemText primary="Blog" />
                </ListItemButton>
              </ListItem>
            {/* ))} */}
          </List>
          </div>
          } else if (role == "ADMIN") {
          return <div>
            <List>
              <ListItem key="user-list" disablePadding onClick={() => SetPageChange("user-list")}>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="User List" />
                </ListItemButton>
              </ListItem>
          </List>
          <List>
              <ListItem key="author-list" disablePadding onClick={() => SetPageChange("author-list")}>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Author List" />
                </ListItemButton>
              </ListItem>
          </List>
          <List>
              <ListItem key="blog-list" disablePadding onClick={() => SetPageChange("blog-list")}>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Blog List" />
                </ListItemButton>
              </ListItem>
          </List>
          </div>
          }
          })()}
        </Box>
      </Drawer>
      <Box component="main">
        <Toolbar />
        {/* {write
        ? <AuthorBlogList />
        : <Write />
            
        } */}
        {(() => {
        if(pageChange=="write")  {
            return(
              // <Write />
        <Box
        component="form"
        id="write-blog"
        sx={{
        '& .MuiTextField-root': { m: 1, width: '75ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        >
        
        {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}
        <Box component="main">
        <Toolbar />
        <Typography paragraph>
        <TextField
                sx={{border: "outset 2px #666666"}}
                id="title"
                label="Title"
                
                fullwidth
                multiline
                rows={1}
                {...register("title", { required: "Title is required." })}
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
          <TextField
            sx={{border: "outset 2px #666666"}}
            id="description"
            label="description"
           
            fullwidth
            multiline
            rows={20}
            {...register("description", { required: "required." })}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
            />
            <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={7}
        >

            <FormControl sx={{width: '15%', marginTop: '0.25rem', border: "outset" }}>
                <InputLabel id="tag">Tag</InputLabel>
                <Select
                labelId="tag"
                id="tag"
                
                label="Tag"
                {...register("tag", { required: "Select tag." })}
                  error={Boolean(errors.tag)}
                  helperText={errors.tag?.message}
                onChange={handleTagChange}
                >
                  {tag.map((t) => {
                    return (
                      <MenuItem value={t.id}>{t.name}</MenuItem>
                    )
                  })}
                </Select>
            </FormControl>
        
        <Button type="submit" variant="contained" size="large" alignment="center">
              Post
        </Button>

        </Stack>
        <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2 }}
        >
        </Box>
        </Typography>
        </Box>  

      </Box>
      )
            } else if(pageChange=="author-blog") {
        return(
          <Box component="main">
            <AuthorBlogList />
          </Box>) } else if(pageChange=="author-list") {
        return(
        <div>
            <AuthorList />
        </div>
        ) }
        else if(pageChange=="user-list") {
          return(
            <Typography paragraph>
              <UserList />
            </Typography>) }
        else if(pageChange=="blog-list") {
          return(
            <Typography paragraph>
              <AdminBlogList />
            </Typography>) }
        })()}
      </Box>
    </Box>
  );
}
