// src/components/dashboard/FuelChart.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const FuelChart = () => {
  const fuelData = [
    { name: 'Excelente (80-100%)', value: 8, color: '#10B981' },
    { name: 'Bueno (60-80%)', value: 12, color: '#F59E0B' },
    { name: 'Bajo (40-60%)', value: 4, color: '#EF4444' },
    { name: 'Crítico (<40%)', value: 1, color: '#DC2626' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado de Combustible</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={fuelData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {fuelData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FuelChart;