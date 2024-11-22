// src/components/RoleForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';
import { getRoles, addRole, editRole, getPermissions } from '../services/api';

const RoleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState({ name: '', permissions: [] });
  const [allPermissions, setAllPermissions] = useState([]);

  useEffect(() => {
    getPermissions().then(data => setAllPermissions(data));
    if (id) {
      getRoles().then(data => {
        const role = data.find(r => r.id === parseInt(id));
        if (role) setRole(role);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await editRole(parseInt(id), role);
    } else {
      await addRole(role);
    }
    navigate('/roles');
  };

  const handlePermissionChange = (event) => {
    const {
      target: { value },
    } = event;
    setRole({
      ...role,
      permissions: typeof value === 'string' ? value.split(',') : value,
    });
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h2" gutterBottom>
        {id ? 'Edit Role' : 'Add Role'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={role.name}
          onChange={(e) => setRole({ ...role, name: e.target.value })}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Permissions</InputLabel>
          <Select
            multiple
            value={role.permissions}
            onChange={handlePermissionChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {allPermissions.map((permission) => (
              <MenuItem key={permission} value={permission}>
                <Checkbox checked={role.permissions.indexOf(permission) > -1} />
                <ListItemText primary={permission} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </Paper>
  );
};

export default RoleForm;
