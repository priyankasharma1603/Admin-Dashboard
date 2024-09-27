// src/App.js
import React from 'react';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import AnalyticsDashboard from './components/AnalyticsDashboard';


import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Admin Panel</h1>
      <UserForm />
      <UserTable />
      <AnalyticsDashboard />
     
    </div>
  );
}

export default App;
