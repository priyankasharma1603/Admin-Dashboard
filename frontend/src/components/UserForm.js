// src/components/UserForm.js
import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ existingUser }) => {
  const [name, setName] = useState(existingUser ? existingUser.name : '');
  const [email, setEmail] = useState(existingUser ? existingUser.email : '');
  const [role, setRole] = useState(existingUser ? existingUser.role : 'user');
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { name, email, role };
    
    if (existingUser) {
      axios.put(`http://localhost:3000/users/${existingUser.id}`, user)
        .then(() => {
          console.log('User updated');
        })
        .catch(error => console.error('Error updating user:', error));
    } else {
      axios.post('http://localhost:3000/users', user)
        .then(() => {
          console.log('User created');
        })
        .catch(error => console.error('Error creating user:', error));
    }
  };

  return (
    <div>
      <h2>{existingUser ? 'Edit User' : 'Create User'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">{existingUser ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default UserForm;
