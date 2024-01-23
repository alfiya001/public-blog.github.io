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
import Divider from "@mui/material/Divider";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { getToken } from "../api/authenticationService";
import { useNavigate } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export default function Write() {

  const [tag, setTag] = React.useState([]);
  // const [title, setTitle] = React.useState('');
  // const [post, setPost] = React.useState('');

  const { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();
  const handleChange = (event) => {

  };

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

  const onSubmit = (data) => {
    const reqdata = {
      title: data.title,
      description: data.description,
      tags: [{
        id: data.tag
      }]
    }
    console.log("data:", reqdata)
    const userid = localStorage.getItem("userid");
    axios.post(`http://localhost:8090/post/${userid}`, reqdata, {
      headers: {
        authorization: "Bearer " + getToken(),
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log(response)
        if (localStorage.getItem("userrole") == "AUTHOR")
          navigate("/author-blog-list")
        else
          navigate("/admin-blog-list")
      })
      .catch(error => {
        // this.setState({ errorMessage: error.message });
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
      {/* <ClippedDrawer /> */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
          <TextField
            sx={{ border: "outset 2px #666666" }}
            
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
            sx={{ border: "outset 2px #666666" }}
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

            <FormControl sx={{ width: '15%', marginTop: '0.25rem', border: "outset" }}>
              <InputLabel id="tag">Tag</InputLabel>
              <Select
                labelId="tag"
                id="tag"

                label="Tag"
                {...register("tag", { required: "Select tag." })}
                error={Boolean(errors.tag)}
                helperText={errors.tag?.message}
                onChange={handleChange}
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


      {/* <div>
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
        </div>

        <div>
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
        </div>

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
                onChange={handleChange}
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

        </Stack> */}

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2 }}
      >
      </Box>
    </Box>
  );
}



