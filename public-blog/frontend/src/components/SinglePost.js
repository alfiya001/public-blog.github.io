import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Container,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Avatar,
  CardHeader
} from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Header from "./Header";
import Footer from "./Footer";
import { getToken } from "../api/authenticationService";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import Comments from "./Comments";
import { blue } from '@mui/material/colors';
import { capitalize } from '@material-ui/core';
import { deepOrange, deepPurple } from '@mui/material/colors';

const useStyles = makeStyles((theme) => ({
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
    alignContent: "left",
  },
  singleBlogContainer: {
    paddingTop: theme.spacing(3),
  },
  cardData: {
    padding: "50px",
    justifyContent: "left"
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 400,
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex"
  },
  BookmarkBorderIcon: {
    cursor: "default",
  },
  footer1: {
    BackgroundColor: "#f6f6f6",
  },
}));
const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function SinglePost() {
  const classes = useStyles();

  const id = useParams();
  const userid = localStorage.getItem("userid");
  const [post, setPost] = React.useState("");

  // const handleLike = () => {
  //   console.log("Like clicked")
  //   axios
  //   .post(`http://localhost:8090/post/${id["id"]}/like/${userid}`, {
  //     headers: {
  //       authorization: "Bearer " + getToken(),
  //     },
  //   })

  //   .then((response) => {
  //     // setPost(response["data"]);
  //     console.log(response);
  //     //navigate('/singlepost');
  //   })

  //   .catch((error) => {
  //     // this.setState({ errorMessage: error.message });

  //     console.error("There was an error!", error);
  //   });
  // };
  
  useEffect(() => {
    axios
      .get(`http://localhost:8090/post/${id["id"]}`, {
        headers: {
          authorization: "Bearer " + getToken(),
        },
      })

      .then((response) => {
        setPost(response["data"]);
        // userid = post["user"]
        console.log(post);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
      // getUser();
  }, []);

  const getUser = () => {
    const email = localStorage.getItem("useremail")
    axios
    .get(`http://localhost:8090/user/${email}`, {
      headers: {
        authorization: "Bearer " + getToken(),
      },
    })

    .then((response) => {
      localStorage.setItem("user", response["data"]);
      console.log(response["data"]);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  }

  return (
    <>
      <div className="SinglePost">
        <Header></Header>
        <Container maxWidth="lg" className={classes.singleBlogContainer}>
          <Typography variant="h3" className={classes.blogTitle}></Typography>
          <Box>
            <Card className={classes.card}>
            <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#751281" }}>
            {/* {capitalize(post.user?.firstName.charAt(0))} */}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={post.user?.firstName + " " + post.user?.lastName}
        subheader={dateFormat(post?.createdAt, "mmmm dS, yyyy")}
      />
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
                  title="Contemplative Reptile"
                />
                <CardContent  className={classes.cardData}>
                  <Typography className={classes.blogTitle} gutterBottom variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ fontSize: "22px" }}
                  >
                    {post.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardActions}>
                <Box className={classes.author}>
                  <Box ml={2}>
                    {/* <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      component="p"
                    >
                      {dateFormat(post.createdAt, "mmmm dS, yyyy")}
                    </Typography> */}
                    {post.tags?.map((tag) => (
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        component="p"
                      >
                        #{tag.name}
                      </Typography>
                    ))}
                  </Box>
                </Box>
                {/* <Box>
                  <BookmarkBorderIcon onClick={handleLike} />
                </Box> */}
              </CardActions>
            </Card>
          </Box>
        </Container>
        <Comments  maxWidth="lg"></Comments>
        <Footer></Footer>
      </div>
    </>
  );
}
