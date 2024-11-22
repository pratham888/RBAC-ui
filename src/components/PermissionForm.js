// src/components/PermissionForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { getPermissions } from '../services/api';

const PermissionForm = ({ onSave }) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [permission, setPermission] = useState('');

  useEffect(() => {
    if (name) {
      getPermissions().then(data => {
        const perm = data.find(p => p === name);
        if (perm) setPermission(perm);
      });
    }
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(permission);
    navigate('/permissions');
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h2" gutterBottom>
        {name ? 'Edit Permission' : 'Add Permission'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Permission Name"
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </Paper>
  );
};

export default PermissionForm;
