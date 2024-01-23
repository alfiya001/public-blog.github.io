import * as React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Container } from "@material-ui/core";
import { getToken } from "../api/authenticationService";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import dateFormat from "dateformat";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Header from "./Header";
import Banner from "./Banner";
import MenuGrid from "./MenuGrid";
import Footer from "./Footer";
import axios from "axios";
import { capitalize } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";

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
  },
}));

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  // const [expanded, setExpanded] = React.useState(false);
  const [expanded, setExpanded] = React.useState(-1);
  const [postlist, setPostlist] = React.useState([]);
  let navigate = useNavigate();
  const [activePage, setActivePage] = useState(0);
  const [totalPages, setTotalPages] = useState(null);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(null);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [tagid, setTagid] = useState(localStorage.getItem("tag"));
  const [pagetitle, setPagetitle] = useState("All Blogs");
  const [bloglength, setBloglength] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [likes, setLikes] = React.useState([]);

  // const [searchParams, setSearchParams] = useSearchParams();

  const classes = useStyles();

  useEffect(() => {
    // console.log("tagid: ",localStorage.getItem("tagid"))
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
        localStorage.setItem("userid", response["data"]["user"]["id"]);
        localStorage.setItem("user", JSON.stringify(response["data"]["user"]));
        console.log(response["data"]["user"]);
      })
      .catch((error) => {
        if (error && error.response) {
          console.log("401 status");
          navigate("/signin");
          // setErrorMessage("Authentication Failed.Bad Credentials");
        } else {
          setErrorMessage("Something Wrong!Please Try Again");
        }
      });
  };

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
    // this.setState({activePage: pageNumber})
    fetchURL(pageNumber);
  };

  const fetchURL = (page) => {
    var u = ``;
    if (tagid == 0) {
      u = `http://localhost:8090/post?page=${page}&size=5`;
      // setFetchUrl(`http://localhost:8090/post?page=${page}&size=5`);
    } else u = `http://localhost:8090/post/${tagid}/tag?page=${page}&size=5`;
    // setFetchUrl(`http://localhost:8090/post/${tagid}/tag?page=${page}&size=5`);
    axios.get(u).then((response) => {
      const totalPages = response.data.totalPages;
      const itemsCountPerPage = response.data.size;
      const totalItemsCount = response.data.totalElements;

      setTotalPages(totalPages);
      setTotalItemsCount(totalItemsCount);
      setItemsCountPerPage(itemsCountPerPage);

      const results = response.data.content;
      setBloglength(results.length);

      const updatedResults = results.map((results) => {
        if (tagid != 0) {
          setPagetitle(results[0].tags[0].name);
        }
        var timestamp = new Date(results.createdAt);
        // let gmt = date['toGMTString']();
        var dateString = timestamp["toGMTString"]();
        return {
          ...results,
          dateString,
        };
      });

      setPostlist(updatedResults);
      setLoading(false); //stop loading when data is fetched
    });

    axios
      .get(
        `http://localhost:8090/likebyuser/${localStorage.getItem(
          "userid"
        )}`,
        {
          headers: {
            authorization: "Bearer " + getToken(),
          },
        }
      )

      .then((response) => {
        setLikes(response["data"]);
        likes.map((like) => {
          // postlist.map((post) => {
            console.log("post id : ",like);
            // if(like["post"]["id"] ==post["id"]) {
            //   setPostlist((existingpost) => [{post, liked: true}, existingpost]);
            // }
          // });
        });
        // console.log("likes: ",postlist);
      })
      .catch((error) => {
        if (error && error.response) {
          console.log("401 status");
          // setErrorMessage("Authentication Failed.Bad Credentials");
        } else {
          setErrorMessage("Something Wrong!Please Try Again");
        }
      });
  };
  const handleChange = (event, value) => {
    // setActivePage(value-1);
    handlePageChange(value - 1);
  };

  // React.useEffect(() => {
  //   axios
  //     .get("http://localhost:8090/post", {
  //       headers: {
  //         authorization: "Bearer " + getToken(),
  //       },
  //     })

  //     .then((response) => {
  //       setPostlist(response['data'])
  //       console.log(response['data']);

  //     })

  //     .catch((error) => {
  //       console.error("There was an error!", error);
  //     });
  // }, []);

  const handleExpandClick = (i) => {
    setExpanded(expanded === i ? -1 : i);
  };

  const onClickLikeHandler = (i) => {
    console.log("like : ",likes);
    axios
      .post(
        `http://localhost:8090/post/${i}/like/${localStorage.getItem(
          "userid"
        )}`,
        {
          headers: {
            authorization: "Bearer " + getToken(),
          },
        }
      )
      .then((response) => {
        // navigate("/dashboard");
        console.log(response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return isLoading ? ( //Checkif if is loading
    <Container maxWidth="lg" className={classes.blogsContainer}>
      <CircularProgress />
    </Container>
  ) : (
    <>
      <Header></Header>
      <Banner />
      <MenuGrid />
      <Container maxWidth="lg" className={classes.blogsContainer}>
        {bloglength == 0 ? (
          <Typography paragraph>Blogs not found :(</Typography>
        ) : (
          <Typography variant="h3" className={classes.blogTitle}>
            {pagetitle}
          </Typography>
        )}

        <Grid container spacing={3}>
          {postlist?.map((post) => (
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {capitalize(post.user.firstName?.charAt(0))}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={capitalize(post.user.firstName)}
                  subheader={dateFormat(post.createdAt, "mmmm dS, yyyy")}
                />
                {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
                <CardContent
                  onClick={(event) => {
                    navigate(`/post/${post.id}`);
                  }}
                >
                  <Typography gutterBottom variant="h5" component="h2">
                    {capitalize(post.title)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.description.slice(0, 150)}
                  </Typography>
                  <Typography align="left" variant="subtitle2">
                    #{capitalize(post.tags[0].name)}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon
                      sx={{ color: red[500] }}
                      onClick={() => onClickLikeHandler(post.id)}
                    />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton aria-label="add to favorites"></IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={() => handleExpandClick(post.id)}
                    // onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse
                  in={expanded === post.id}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent>
                    <Typography paragraph>Blog's Detail</Typography>
                    <Typography paragraph>{post.description}</Typography>
                    {/* <Typography paragraph>
                      Heat oil in a (14- to 16-inch) paella pan or a large, deep
                      skillet over medium-high heat. Add chicken, shrimp and
                      chorizo, and cook, stirring occasionally until lightly
                      browned, 6 to 8 minutes. Transfer shrimp to a large plate
                      and set aside, leaving chicken and chorizo in the pan. Add
                      pimentón, bay leaves, garlic, tomatoes, onion, salt and
                      pepper, and cook, stirring often until thickened and
                      fragrant, about 10 minutes. Add saffron broth and
                      remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                      Add rice and stir very gently to distribute. Top with
                      artichokes and peppers, and cook without stirring, until
                      most of the liquid is absorbed, 15 to 18 minutes. Reduce
                      heat to medium-low, add reserved shrimp and mussels,
                      tucking them down into the rice, and cook again without
                      stirring, until mussels have opened and rice is just
                      tender, 5 to 7 minutes more. (Discard any mussels that
                      don&apos;t open.)
                    </Typography>
                    <Typography>
                      Set aside off of the heat to let rest for 10 minutes, and
                      then serve.
                    </Typography> */}
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <div class="paging-container">
        <Pagination
          hideNavigation
          //  activePage={activePage}
          page={activePage + 1}
          itemsCountPerPage={itemsCountPerPage}
          //  totalItemsCount={totalItemsCount}
          count={totalPages}
          pageRangeDisplayed={10}
          itemClass="page-item"
          linkClass="btn btn-light"
          onChange={handleChange}
        />
      </div>
    </>
  );
}
