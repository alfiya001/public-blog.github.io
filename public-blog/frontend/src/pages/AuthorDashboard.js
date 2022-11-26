import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff",
  },
  type2: {
    marginLeft: theme.spacing(10),
    display: "flex",
    cursor: "pointer",
  },
}));

export default function AuthorDashboard() {
  let navigate = useNavigate();
  const classes = useStyles();
  const handleChange = (event) => {
    localStorage.setItem("USER_KEY", "");
    navigate("/signin");
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: "#1a1a1a",
        }}
      >
      <Header/>
        {/* <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Author Dashboard
          </Typography>
        </Toolbar> */}
      </AppBar>
      <div>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: " #e6e6e6",
          },
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />

        <Divider sx={{ border: "1px solid #8c8c8c" }} />

        <List>
          <ListItem button onClick={() => navigate("/write")}>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Write" />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ border: "1px solid #8c8c8c" }} />

          <ListItem button onClick={() => navigate("/author-blog-list")}>
            <ListItemButton>
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Blog" />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ border: "1px solid #8c8c8c" }} />
        </List>
      </Drawer>
      </div>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
