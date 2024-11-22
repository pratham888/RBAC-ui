// src/components/UserForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { getUsers, addUser, editUser } from '../services/api';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', roles: [], status: 'Active' });

  useEffect(() => {
    if (id) {
      getUsers().then(data => {
        const user = data.find(u => u.id === parseInt(id));
        if (user) setUser(user);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await editUser(parseInt(id), user);
    } else {
      await addUser(user);
    }
    navigate('/');
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h2" gutterBottom>
        {id ? 'Edit User' : 'Add User'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
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

export default UserForm;
