// src/components/PermissionList.js
import React, { useState, useEffect } from 'react';
import { getPermissions, deletePermission } from '../services/api';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const PermissionList = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    getPermissions().then(data => setPermissions(data));
  }, []);

  const handleDelete = async (permission) => {
    await deletePermission(permission);
    setPermissions(permissions.filter(p => p !== permission));
  };

  return (
    <Paper style={{ padding: '16px', marginTop: '16px' }}>
      <Typography variant="h4" gutterBottom>
        Permissions
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/permission/new"
        style={{ marginBottom: '16px' }}
      >
        Add Permission
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Permission</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission}>
                <TableCell>{permission}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    style={{ marginRight: '8px' }}
                    component={Link}
                    to={`/permission/edit/${permission}`}
                  >
                    Edit
                  </Button>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(permission)}
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

export default PermissionList;
