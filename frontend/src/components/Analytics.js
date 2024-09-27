import React from "react";
import { Line } from "react-chartjs-2";

const Analytics = ({ users }) => {
  const last30DaysUsers = users.filter(user => {
    const date = new Date(user.registeredAt);
    return date >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  });

  const chartData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "User Registrations",
        data: last30DaysUsers.map(user => user.id), // Placeholder for actual logic
        fill: false,
        borderColor: "#42A5F5",
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h2>Analytics</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Analytics;
