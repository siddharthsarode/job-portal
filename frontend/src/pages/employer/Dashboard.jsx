import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-light text-dark p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-primary mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-ternary rounded-xl p-5 shadow hover:shadow-lg transition duration-300">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold text-primary mt-1">12,300</h2>
        </div>

        <div className="bg-ternary rounded-xl p-5 shadow hover:shadow-lg transition duration-300">
          <p className="text-sm text-gray-500">Active Jobs</p>
          <h2 className="text-2xl font-bold text-info mt-1">245</h2>
        </div>

        <div className="bg-ternary rounded-xl p-5 shadow hover:shadow-lg transition duration-300">
          <p className="text-sm text-gray-500">New Applications</p>
          <h2 className="text-2xl font-bold text-green mt-1">1,580</h2>
        </div>

        <div className="bg-ternary rounded-xl p-5 shadow hover:shadow-lg transition duration-300">
          <p className="text-sm text-gray-500">Conversion Rate</p>
          <h2 className="text-2xl font-bold text-accent mt-1">8.4%</h2>
        </div>
      </div>

      <div className="bg-ternary p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-dark">Traffic Overview</h3>
          <button className="bg-accent text-dark px-4 py-2 rounded hover:opacity-90 text-sm">
            Download Report
          </button>
        </div>
        <div className="w-full h-60 bg-light border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400">
          Chart Placeholder
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
