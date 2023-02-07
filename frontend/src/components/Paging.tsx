import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import dateFormat from 'dateformat';
import { useNavigate } from "react-router-dom";
import "./Home.css";
// import Pagination from "react-js-pagination";

import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Avatar,
  CardHeader,
  List,
  ListItem
} from "@material-ui/core";
import Pagination from '@mui/material/Pagination';

import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
// import {BookmarkBorderIcon} from "@material-ui/icons/BookmarkBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Header from "./Header";
import Banner from "./Banner";
import Footer from "./Footer";
import { getToken } from "../api/authenticationService";
import axios from 'axios';

import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
const useStyles = makeStyles((theme) => ({
  pagecontainer: {
    margin: "0 auto",
    width: "700px",
    height: "100px",
  },
  hero: {
    //// backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/3454270/pexels-photo-3454270.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')`,
    ////height: "500px",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#000000",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em",
    },
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
    marginTop: 0,
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240,
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
  },

  footer1: {
    BackgroundColor: "#f6f6f6",
  }
}));

function Home() {
  let navigate = useNavigate();
  const [postlist, setPostlist] = useState([]);
  const [activePage, setActivePage]=useState(0);
  const [totalPages, setTotalPages]=useState(null);
  const [itemsCountPerPage, setItemsCountPerPage]=useState(null);
  const [totalItemsCount, setTotalItemsCount]=useState(0);
  const [expanded, setExpanded] = React.useState(false);

  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  useEffect(() => {
    
    getUser();
    handlePageChange(activePage);
 
  }, []);

  const getUser = () => {
    const email = localStorage.getItem("email");
    axios
    .get(`http://localhost:8090/user/email/${email}`, {
      headers: {
        authorization: "Bearer " + getToken(),
      },
    })

    .then((response) => {
      localStorage.setItem("userid", response['data']['user']['id']);
      localStorage.setItem("user", JSON.stringify(response['data']['user']) );
      console.log(response['data']['user']);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  }

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
    // this.setState({activePage: pageNumber})
    fetchURL(pageNumber)

    }

    const fetchURL = (page) => {

        axios.get(`http://localhost:8090/post?page=${page}&size=2`)
          .then( response => {
    
              const totalPages = response.data.totalPages;
              const itemsCountPerPage = response.data.size;
              const totalItemsCount = response.data.totalElements;
    
              setTotalPages(totalPages);
              setTotalItemsCount(totalItemsCount);
                console.log("totalItemsCount: ",totalItemsCount);
              setItemsCountPerPage(itemsCountPerPage);
    
              const results = response.data.content;
                console.log("result: ",results);
    
              const updatedResults = results.map(results => {
    
                var timestamp = new Date(results.createdAt)
                var dateString = timestamp.toUTCString()
                return {
                    ...results, dateString
                  }
                });
    
                console.log("ipda",updatedResults);
                setPostlist(updatedResults);
                console.log(activePage);
                console.log(itemsCountPerPage);
                console.log("post",postlist);
    
            }
          );
        }
      const handleChange = (event, value) => {
        // setActivePage(value-1);
    handlePageChange(value-1);
    };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    
  );
}

export default Home;
