// src/components/dashboard/MonthlyStatsChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Ene', vehicles: 20, incidents: 2, maintenance: 1 },
  { month: 'Feb', vehicles: 22, incidents: 1, maintenance: 3 },
  { month: 'Mar', vehicles: 25, incidents: 3, maintenance: 2 },
  { month: 'Abr', vehicles: 25, incidents: 1, maintenance: 1 },
  { month: 'May', vehicles: 28, incidents: 2, maintenance: 4 },
  { month: 'Jun', vehicles: 30, incidents: 1, maintenance: 2 }
];

function MonthlyStatsChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas Mensuales</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="vehicles" fill="#3B82F6" name="Vehículos" />
            <Bar dataKey="incidents" fill="#EF4444" name="Incidentes" />
            <Bar dataKey="maintenance" fill="#F59E0B" name="Mantenimientos" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyStatsChart;