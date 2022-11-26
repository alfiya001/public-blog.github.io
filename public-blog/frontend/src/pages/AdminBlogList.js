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
import axios from 'axios';
import AdminDashboard from "./AdminDashboard";
import { getToken } from "../api/authenticationService";
import * as React from "react";


export default function AdminBlogList() {

  const [blogData, setAllPost] = React.useState([]);
  localStorage.setItem("tagid", 0);

  const columns = [
    { id: "id", label: "Blog Id", minWidth: 50, align: "center" },
    { id: "title", label: "Title", minWidth: 50, align: "left" },
    { id: "createdAt", label: "Created Date", minWidth: 50, align: "left" },
  ];

  const getAllpost = () => {
    axios.get('http://localhost:8090/post', {
      headers: {
        authorization: "Bearer " + getToken(),

      },
    })
      .then(res => {
        setAllPost(res["data"]["content"]);
        console.log('Response', res);
      }).catch(error => {
        // this.setState({ errorMessage: error.message });
        console.error('There was an error!', error);
      });
  }
  console.log('all post', blogData);

  const deletePostByID = (postId) => {
    console.log(postId);
    axios.delete(`http://localhost:8090/post/${postId}`, {
      headers: {
        authorization: "Bearer " + getToken(),
      },
    })
      .then(res => {
        getAllpost();
        console.log('Response', res);

      }).catch(error => {
        console.error('There was an error!', error);
      });
  }

  useEffect(() => {
    getAllpost();
  }, []);
  console.log("globle data", blogData)
  return (

    <div className="AuthorBlogList">
      {/* <div>
      <AdminDashboard />
      </div> */}
      
    <div>
      <Paper sx={{ml:25}}>
        <TableContainer sx={{ maxHeight: 440 }}>
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
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>

                        );
                      })}
                      <TableCell>
                        <IconButton onClick={() => {deletePostByID(row.id)}}>
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
    </div>
    </div>
  );
} 