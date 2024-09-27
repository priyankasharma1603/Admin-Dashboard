// src/components/AnalyticsDashboard.js
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import axios from 'axios';

const AnalyticsDashboard = () => {
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        const stats = calculateRoleDistribution(response.data);
        setUserStats(stats);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const calculateRoleDistribution = (users) => {
    const roles = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {});
    
    return Object.keys(roles).map(role => ({ name: role, value: roles[role] }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <h2>User Role Distribution</h2>
      <PieChart width={400} height={400}>
        <Pie data={userStats} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
          {userStats.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default AnalyticsDashboard;
