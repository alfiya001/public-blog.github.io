import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios';
import AdminDashboard from "./AdminDashboard";
import { getToken } from "../api/authenticationService";
import dateFormat from "dateformat";

function createData(user, email, id) {
  return { user, email, id };
}

const rows = [
  createData({firstName: 'bob',lastName:'go'},'abs@hotmail.com',3 ),
  createData({firstName: 'bob',lastName:'sa'},'abs@hotmail.com',3),
  createData({firstName: 'bob',lastName:'ta'},'abs@hotmail.com',3),
  createData({firstName: 'bob',lastName:'ba'},'abs@hotmail.com',3),
  createData({firstName: 'bob',lastName:'go'},'hello@hotmail.com',3),
];
localStorage.setItem("tagid", 0);

export default function UserList() {

    const [userData, setUserData] = React.useState([]);

    const getAllusers = () => {
        const role= "USER"
        const res = axios.get('http://localhost:8090/user/userrole/'+role,{
          headers: {
            authorization: "Bearer " + getToken(),
            
          },
        })
          .then(res => {
            console.log('Response', res);
            setUserData(res["data"]);
    
          }).catch(error => {
            console.error('There was an error!', error);
          });
      }
    
      const deleteUser = (userId) => {
        console.log(userId);
        axios.delete(`http://localhost:8090/user/${userId}`, {
          headers: {
            authorization: "Bearer " + getToken(),
          },
        })
          .then(res => {
            getAllusers();
            console.log('Response', res);
    
          }).catch(error => {
            console.error('There was an error!', error);
          });
      }
    
      useEffect(() => {
        getAllusers();
      }, []);

  return (
      <>

    {/* <AdminDashboard /> */}
    <Paper sx={{ml:20}}>
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="table">
        <TableHead>
          <TableRow
          sx={{ ' &:last-child th': {fontWeight: 'bold' } }}
          >
            <TableCell align="center" classes="fw-bold">First name</TableCell>
            <TableCell align="center">Last name</TableCell>
            <TableCell align="center">Email Address</TableCell>
            <TableCell align="center">Created Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((row) => (
            <TableRow
              key={row.user}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                {row.user.firstName}
              </TableCell>
              <TableCell align="center">{row.user.lastName}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{dateFormat(row.createdAt, "mmmm dS, yyyy")}</TableCell>
              
              {/* <TableCell align="center">
                  <IconButton  
                    onClick={() => {deleteUser(row.id)}}
                    >
                  <DeleteIcon />
                    </IconButton>
                    </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </>
  );
}
