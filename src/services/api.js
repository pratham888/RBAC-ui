// src/services/api.js
const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', roles: [1], status: 'Active' },
    { id: 2, name: 'Bob', email: 'bob@example.com', roles: [2], status: 'Inactive' },
  ];
  
  const roles = [
    { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'] },
    { id: 2, name: 'User', permissions: ['read'] },
  ];
  
  let permissions = ['read', 'write', 'delete'];
  
  export const getUsers = () => Promise.resolve(users);
  export const getRoles = () => Promise.resolve(roles);
  export const getPermissions = () => Promise.resolve(permissions);
  
  export const addUser = (user) => {
    user.id = users.length + 1;
    users.push(user);
    return Promise.resolve(user);
  };
  
  export const editUser = (id, user) => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = user;
    }
    return Promise.resolve(user);
  };
  
  export const deleteUser = (id) => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users.splice(index, 1);
    }
    return Promise.resolve();
  };
  
  export const addRole = (role) => {
    role.id = roles.length + 1;
    roles.push(role);
    return Promise.resolve(role);
  };
  
  export const editRole = (id, role) => {
    const index = roles.findIndex(r => r.id === id);
    if (index !== -1) {
      roles[index] = role;
    }
    return Promise.resolve(role);
  };
  
  export const deleteRole = (id) => {
    const index = roles.findIndex(r => r.id === id);
    if (index !== -1) {
      roles.splice(index, 1);
    }
    return Promise.resolve();
  };
  
  export const addPermission = (permission) => {
    permissions.push(permission);
    return Promise.resolve(permission);
  };
  
  export const deletePermission = (permission) => {
    const index = permissions.findIndex(p => p === permission);
    if (index !== -1) {
      permissions.splice(index, 1);
    }
    return Promise.resolve();
  };
  