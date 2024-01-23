// import "./styles.css";
import { useEffect, Fragment } from "react";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// Icons
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import AuthorDashboard from "./AuthorDashboard";
import { getToken } from "../api/authenticationService";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import dateFormat from "dateformat";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from "@material-ui/core";

import Box from "@mui/material/Box";

import { useForm } from "react-hook-form";

export default function AuthorBlogList() {
  let navigate = useNavigate();
  const [blogData, setAllPost] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const [postId, setPostId] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setLoading] = React.useState(false);

  const columns = [
    { id: "id", label: "Blog Id", minWidth: 50, align: "center" },
    { id: "title", label: "Title", minWidth: 50, align: "left" },
  ];

  const [open, setOpen] = React.useState(false);
  // localStorage.setItem("tagid", 0);

  // const handleClickOpen = () => {
  //   getPost();
  // };

  const handleClose = (e) => {
    // e.preventDefault();
    setTitle('');
    setDescription('');
    setOpen(false);
    setLoading(false);
  };
  const getAllpost = () => {
    const userid = localStorage.getItem("userid");
    axios
      .get(`http://localhost:8090/post/user/${userid}`, {
        headers: {
          authorization: "Bearer " + getToken(),
        },
      })
      .then((res) => {
        setAllPost(res["data"]);
        console.log("Response", res);
      })
      .catch((error) => {
        // this.setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
  };
  console.log("all post", blogData);

  const deletePostByID = (postId) => {
    console.log(postId);
    axios
      .delete(`http://localhost:8090/post/${postId}`, {
        headers: {
          authorization: "Bearer " + getToken(),
        },
      })
      .then((res) => {
        getAllpost();
        console.log("Response", res);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    getAllpost();
  }, []);
  console.log("globle data", blogData);

  const getPost = (postId) => {
    axios
      .get(`http://localhost:8090/post/${postId}`, {
        headers: {
          authorization: "Bearer " + getToken(),
        },
      })

      .then((response) => {
        setTitle(response["data"]["title"]);
        setDescription(response["data"]["description"]);
        setUser(response["data"]["user"]);
        // setPost(response["data"]);
        // setComments(response["data"]["comments"])
        console.log("title: ",  title);
        setOpen(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const onSubmit = (data) => {
    console.log("data:", data);
    const reqdata = {
      title: data.title,
      description: data.description,
      // tags: tag,
      user: user,
      // comments: comments
    };

    axios
      .patch(`http://localhost:8090/post/${postId}`, reqdata, {
        headers: {
          authorization: "Bearer " + getToken(),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        navigate("/dashboard");
        console.log(response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div className="AuthorBlogList">
      {isLoading && <Container maxWidth="lg">
      <CircularProgress/>
    </Container>}
      {/* <AuthorDashboard /> */}

      <Paper sx={{ ml: 25,  width: "100%", height:"100%" }}>
        <TableContainer sx={{ marginTop: "30px", maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: "700" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell style={{ fontWeight: "700" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blogData.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <Fragment>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            onClick={(event) => {
                              navigate(`/post/${row.id}`);
                            }}
                          >
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <IconButton
                          onClick={(event) => {
                            setLoading(true);
                            // setPostId(row.id)
                            getPost(row.id);
                            // navigate(`/dashboard/${row.id}`);
                            // navigate(`/edit-blog/${row.id}`);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            deletePostByID(row.id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </Fragment>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Edit dialog */}

      {!isLoading && (
      <div>
        <Dialog open={open} onClose={handleClose}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {},
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <DialogTitle>Edit Blog Details</DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText> */}
              <TextField
                autoFocus
                value={title}
                margin="dense"
                id="title"
                label="Blog Title"
                type="text"
                fullWidth
                variant="standard"
                {...register("title", { required: "Title is required." })}
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <TextField
                autoFocus
                value={description}
                margin="dense"
                id="description"
                label="Blog description"
                type="text"
                fullWidth
                variant="standard"
                multiline
                rows={15}
                {...register("description", {
                  required: "Description is required.",
                })}
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              {/* <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Blog description"
            type="text"
            value={description}
            fullwidth
            // multiline
            // rows={20}
            variant="standard"
            {...register("description", { required: "required." })}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
            onChange={(e)=>{setDescription(e.target.value);}}
            /> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Save Changes
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </div>)}
    </div>
  );
}
