import * as React from 'react';
import { useEffect } from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import axios from 'axios';
import { getToken } from "../api/authenticationService";
import TagIcon from '@mui/icons-material/Tag';
import { useNavigate } from "react-router-dom";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

export default function AccountMenu() {
    let navigate = useNavigate();
    const [tag, setTag] = React.useState([]);
    useEffect(() => {
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
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', spacing:0, justifyContent:"center" }}>
      {tag.map((t) => {
        return ( 
            <IconButton aria-label="add to favorites">
                <TagIcon />
                <MenuItem autofocus="true" value={t.id} onClick={(event) => 
                       {
                            console.log("tagclicked: ",t.id)
                            localStorage.setItem("tag", t.id)
                            window. location. reload()
                        // console.log("Div is clicked")
                    }}>{t.name}</MenuItem>
            </IconButton>
         )})}
            <MenuItem variant="right" onClick={(event) => 
                       {
                            localStorage.setItem("tag", 0)
                            window. location. reload()
                        // console.log("Div is clicked")
                    }}>
          <StorefrontOutlinedIcon /> All Blogs
        </MenuItem>
      </Box>
      
    </React.Fragment>
  );
}