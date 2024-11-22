// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/api';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(data => setUsers(data));
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <Paper style={{ padding: '16px', marginTop: '16px' }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/user/new"
        style={{ marginBottom: '16px' }}
      >
        Add User
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.roles.join(', ')}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    style={{ marginRight: '8px' }}
                    component={Link}
                    to={`/user/edit/${user.id}`}
                  >
                    Edit
                  </Button>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserList;
