import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import dateFormat from 'dateformat';
import { useNavigate } from "react-router-dom";
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
  List,
  ListItem,
} from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Header from "./Header";
import Banner from "./Banner";
import Footer from "./Footer";
import { getToken } from "../api/authenticationService";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
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
  },
}));

function Home() {
  let navigate = useNavigate();
  const [postlist, setPostlist] = useState([])
  const classes = useStyles();
  
  useEffect(() => {
    
    getUser();
    axios
      .get("http://localhost:8090/post", {
        headers: {
          authorization: "Bearer " + getToken(),
        },
      })

      .then((response) => {
        setPostlist(response['data'])
        console.log(response['data']);

      })

      .catch((error) => {
        console.error("There was an error!", error);
      });
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
  return (
    <>
      <Header></Header>
      <Banner />

      <div className="App">
        <Box className={classes.hero}></Box>
        <Container maxWidth="lg" className={classes.blogsContainer}>
          <Typography variant="h4" className={classes.blogTitle}>
            Blogs
          </Typography>
          <Grid container spacing={3}>
            {postlist ?.map(post =>
              <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
                    title="Contemplative Reptile"
                    onClick={(event) => 
                       {
                        navigate(`/post/${post.id}`);
                        // console.log("Div is clicked")
                    }
                  }
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {post.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                  <Box className={classes.author}>
                    <Avatar src="" />
                    <Box ml={2}>
                      <Typography variant="subtitle2" component="p">
                        {/* {post.user} */}
                        {/* {post.user.firstName} {post.user.lastName} */}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        component="p"
                      >
                        {dateFormat(post.createdAt, "mmmm dS, yyyy")}
                      </Typography>
                    </Box>
                  </Box>
                  {/* <Box>
                    <BookmarkBorderIcon />
                  </Box> */}
                </CardActions>
              </Card>
            </Grid>
            )}
            
            {/* <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Business
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Consequuntur quis itaque dolor, dolores, quo quam
                      molestias minima quia explicabo iste deserunt asperiores
                      debitis fugiat in, sed beatae doloribus iusto animi.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                  <Box className={classes.author}>
                    <Avatar src="" />
                    <Box ml={2}>
                      <Typography variant="subtitle2" component="p">
                        Alfiya
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        component="p"
                      >
                        May 14, 2020
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <BookmarkBorderIcon />
                  </Box>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://images.pexels.com/photos/1464203/pexels-photo-1464203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Curent Affairs
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Consequuntur quis itaque dolor, dolores, quo quam
                      molestias minima quia explicabo iste deserunt asperiores
                      debitis fugiat in, sed beatae doloribus iusto animi.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                  <Box className={classes.author}>
                    <Avatar src="" />
                    <Box ml={2}>
                      <Typography variant="subtitle2" component="p">
                        Akshata
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        component="p"
                      >
                        May 14, 2020
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <BookmarkBorderIcon />
                  </Box>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://images.pexels.com/photos/6207010/pexels-photo-6207010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      News
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Consequuntur quis itaque dolor, dolores, quo quam
                      molestias minima quia explicabo iste deserunt asperiores
                      debitis fugiat in, sed beatae doloribus iusto animi.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                  <Box className={classes.author}>
                    <Avatar src="" />
                    <Box ml={2}>
                      <Typography variant="subtitle2" component="p">
                        Shrikant
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        component="p"
                      >
                        May 14, 2020
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <BookmarkBorderIcon />
                  </Box>
                </CardActions>
              </Card>
            </Grid> */}
          </Grid>
        </Container>

        <Footer></Footer>
      </div>
    </>
  );
}

export default Home;
