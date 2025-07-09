// src/components/dashboard/SpeedChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SpeedChart = () => {
  // Datos simulados para el gráfico de velocidad
  const speedData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    speed: Math.floor(Math.random() * 60) + 20
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Velocidad Promedio por Hora</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={speedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="speed" stroke="#3B82F6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpeedChart;