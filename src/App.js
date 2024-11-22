// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Link } from '@mui/material';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import RoleList from './components/RoleList';
import RoleForm from './components/RoleForm';
import PermissionList from './components/PermissionList';
import PermissionForm from './components/PermissionForm';
const App = () => {
  const [permissions, setPermissions] = useState(['read', 'write', 'delete']);

  const handleSavePermission = (newPermission) => {
    setPermissions([...permissions, newPermission]);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RBAC Management
          </Typography>
          <Link href="/" color="inherit" sx={{ marginRight: 2 }}>Users</Link>
          <Link href="/roles" color="inherit" sx={{ marginRight: 2 }}>Roles</Link>
          <Link href="/permissions" color="inherit">Permissions</Link>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route exact path="/" element={<UserList />} />
          <Route path="/user/new" element={<UserForm />} />
          <Route path="/user/edit/:id" element={<UserForm />} />
          <Route path="/roles" element={<RoleList />} />
          <Route path="/role/new" element={<RoleForm />} />
          <Route path="/role/edit/:id" element={<RoleForm />} />
          <Route exact path="/permissions" element={<PermissionList />} />
          <Route path="/permission/new" element={<PermissionForm onSave={handleSavePermission} />} />
          <Route path="/permission/edit/:name" element={<PermissionForm onSave={handleSavePermission} />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
