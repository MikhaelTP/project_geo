// src/pages/DashboardPage.js
import React from 'react';
import StatsGrid from '../components/dashboard/StatsGrid';
import SpeedChart from '../components/dashboard/SpeedChart';
import FuelChart from '../components/dashboard/FuelChart';
import MonthlyStatsChart from '../components/dashboard/MonthlyStatsChart';

const DashboardPage = ({ setSelectedVehicle }) => {
  return (
    <div className="space-y-6">
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpeedChart />
        <FuelChart />
      </div>
      <MonthlyStatsChart />
    </div>
  );
};

export default DashboardPage;