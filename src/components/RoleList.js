// src/components/RoleList.js
import React, { useState, useEffect } from 'react';
import { getRoles, deleteRole } from '../services/api';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const RoleList = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getRoles().then(data => setRoles(data));
  }, []);

  const handleDelete = async (id) => {
    await deleteRole(id);
    setRoles(roles.filter(role => role.id !== id));
  };

  return (
    <Paper style={{ padding: '16px', marginTop: '16px' }}>
      <Typography variant="h4" gutterBottom>
        Roles
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/role/new"
        style={{ marginBottom: '16px' }}
      >
        Add Role
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.id}</TableCell>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.permissions.join(', ')}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    style={{ marginRight: '8px' }}
                    component={Link}
                    to={`/role/edit/${role.id}`}
                  >
                    Edit
                  </Button>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(role.id)}
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

export default RoleList;
