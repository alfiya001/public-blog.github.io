import * as React from "react";
import {
  Box,
  Avatar,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getToken } from "../api/authenticationService";
import { useEffect } from "react";
import dateFormat from "dateformat";
import { red } from '@mui/material/colors';
import { capitalize } from '@material-ui/core';
import CardHeader from '@mui/material/CardHeader';

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
export default function Comments() {
  const id = useParams();
  const [comments, setComments] = React.useState([]);
  const [comment, setComment] = React.useState("");
  // console.log('comment:' , comment);
  const avatarStyle = {
    color: "green",
    fontSize: "1.5rem",
    boxShadow: 20,
    backgroundColor: "rgb(210,180,140)",
    border: "2px solid blue",
  };

  useEffect(() => {
    console.log("id ", id["id"]);
    getAllComments();
  }, []);
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("data:" + data);
    const reqdata = {
      comment: data.comment,
      user: JSON.parse(localStorage.getItem("user")),
    };
    // const newUser= JSON.parse(data)//
    axios
      .post(`http://localhost:8090/post/${id["id"]}/comments`, reqdata, {
        headers: {
          authorization: "Bearer " + getToken(),
        },
      })
      .then((response) => {
        console.log(response);
        document.getElementById("comment-form").reset();
        getAllComments();
        //   navigate('/signin');
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
    console.log(data);
  };

  const getAllComments = () => {
    // const post={post.title};
    axios
      .get(`http://localhost:8090/post/${id["id"]}/comments`
      // , {
      //   headers: {
      //     authorization: "Bearer " + getToken(),
      //   },
      // }
      )
      .then((response) => setComments(response.data));
  };
  return (
    <>
      <div style={{ padding: 14 }} className="Comments">
        <h1>Comments</h1>
        <Box
          id="comment-form"
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="comment"
            label="Add Comment"
            name="comment"
            autoComplete="comment"
            autoFocus
            onChange={handleCommentChange}
            {...register("comment", {
              required: "*Required",
            })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          {/* <TextField
id="outlined-multiline-flexible"
label="Type your comment..."
multiline
maxRows={4}
value={comment}
onChange={handleCommentChange}

/> */}
          <Button variant="contained" type="submit">
            {" "}
            Submit{" "}
          </Button>
        </Box>
        {comments ?.map(comment =>
        <Paper style={{ padding: "40px 20px", marginTop: 30 }}>
       
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item >
            <Avatar sx={avatarStyle} aria-label="recipe">
            {capitalize(comment.user.firstName?.charAt(0))}
            </Avatar>
            </Grid>
            <Grid justifyContent="flex-start" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>{ comment.user.firstName } { comment.user.lastName }</h4>
              <p style={{ textAlign: "left" }}>
                { capitalize(comment.comment) }{" "}
              </p>
              <p style={{ textAlign: "left", color: "gray" }}>
              {dateFormat(comment.createdAt, "mmmm dS, yyyy")}
              </p>
            </Grid>
          </Grid>
        
          {/* <Divider variant="fullWidth" style={{ margin: "30px 0" }} /> */}
          {/* <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" src={imgLink} />
            </Grid>
            <Grid justifyContent="flex-start" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
              <p style={{ textAlign: "left" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                luctus ut est sed faucibus. Duis bibendum ac ex vehicula
                laoreet. Suspendisse congue vulputate lobortis. Pellentesque at
                interdum tortor. Quisque arcu quam, malesuada vel mauris et,
                posuere sagittis ipsum. Aliquam ultricies a ligula nec faucibus.
                In elit metus, efficitur lobortis nisi quis, molestie porttitor
                metus. Pellentesque et neque risus. Aliquam vulputate, mauris
                vitae tincidunt interdum, mauris mi vehicula urna, nec feugiat
                quam lectus vitae ex.{" "}
              </p>
              <p style={{ textAlign: "left", color: "gray" }}>
                posted 1 minute ago
              </p>
            </Grid>
          </Grid> */}
        </Paper>
        )}
        
      </div>
    </>
  );
}
