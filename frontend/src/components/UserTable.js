// src/components/UserTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  useEffect(() => {
    // Fetch users from the JSON server
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:3000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  };

  const handleEdit = (id, name) => {
    setEditingUserId(id);
    setUpdatedName(name);
  };

  const handleSave = (id) => {
    // Update user name on the server
    axios.put(`http://localhost:3000/users/${id}`, { ...users.find(user => user.id === id), name: updatedName })
      .then(response => {
        const updatedUser = response.data;
        setUsers(users.map(user => (user.id === id ? updatedUser : user)));
        setEditingUserId(null); // Reset editing user
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`)
      .then(() => {
        // Update local state immediately after deletion
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingUserId === user.id ? (
                  <input 
                    type="text" 
                    value={updatedName} 
                    onChange={(e) => setUpdatedName(e.target.value)} 
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {editingUserId === user.id ? (
                  <button onClick={() => handleSave(user.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(user.id, user.name)}>Edit</button>
                )}
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
