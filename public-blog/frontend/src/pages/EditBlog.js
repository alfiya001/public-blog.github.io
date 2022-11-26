import * as React from 'react';
import { useEffect } from "react";
import Box from '@mui/material/Box';
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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EditBlog() {

    const [tag, setTag] = React.useState([]);
    const [comments, setComments] = React.useState([]);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [post, setPost] = React.useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();

    let navigate = useNavigate();
    const id = useParams();

  useEffect(() => {
    getPost();
  }, []);

  
  const getPost = () => {
    axios
      .get(`http://localhost:8090/post/${id["id"]}`, {
        headers: {
          authorization: "Bearer " + getToken(),
        },
      })

      .then((response) => {
        setTitle(response["data"]["title"])
        setDescription(response["data"]["description"])
        setTag(response["data"]["tags"])
        setPost(response["data"]);
        setComments(response["data"]["comments"])
        console.log(post);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
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
    console.log("data:",data)
    const reqdata = {
      title: data.title,
      description: data.description,
      tags: tag,
      user: JSON.parse(localStorage.getItem("user")),
      comments: comments
    }
    
    axios.patch(`http://localhost:8090/post/${id["id"]}`, reqdata, {
      headers: {
        authorization: "Bearer " + getToken(),
        'Content-Type': 'application/json',
      },
    })
        .then(response => {
          navigate("/author-blog-list") 
          console.log(response) 
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
  }
  return (
    <Box
        component="form"
        sx={{
        '& .MuiTextField-root': { m: 1, width: '75ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
    >
        <AuthorDashboard />
        <div>
            <TextField
                sx={{border: "outset 2px #666666"}}
                label="Title"
                value={title}
                fullwidth
                multiline
                rows={1}
                {...register("title", { required: "Title is required." })}
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                onChange={(e)=>{setTitle(e.target.value);}}
                />
        </div>

        <div>
         <TextField
            sx={{border: "outset 2px #666666"}}
            label="description"
            value={description}
            fullwidth
            multiline
            rows={20}
            {...register("description", { required: "required." })}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
            onChange={(e)=>{setDescription(e.target.value);}}
            />
        </div>

        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={7}
        >
        
        <Button type="submit" variant="contained" size="large" alignment="center">
              Save
        </Button>

        </Stack>

        <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2 }}
        >
        </Box>
    </Box>
  );
}



