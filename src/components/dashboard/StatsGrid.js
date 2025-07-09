// src/components/dashboard/StatsGrid.js
import React from 'react';
import { Car, CheckCircle, XCircle, Activity, AlertTriangle, Wifi } from 'lucide-react';
import useVehicles from '../../hooks/useVehicles';

const StatsGrid = () => {
  const { vehicles } = useVehicles();

  const stats = {
    total: vehicles.length,
    active: vehicles.filter(v => v.status === 'En ruta').length,
    stopped: vehicles.filter(v => v.status === 'Detenido').length,
    maintenance: vehicles.filter(v => v.status === 'Mantenimiento').length,
    emergency: vehicles.filter(v => v.status === 'Emergencia').length,
    offline: vehicles.filter(v => v.status === 'Offline').length
  };

  const statCards = [
    { label: 'Total', value: stats.total, icon: Car, color: 'text-gray-900' },
    { label: 'En Ruta', value: stats.active, icon: CheckCircle, color: 'text-green-600' },
    { label: 'Detenidos', value: stats.stopped, icon: XCircle, color: 'text-red-600' },
    { label: 'Mantenimiento', value: stats.maintenance, icon: Activity, color: 'text-yellow-600' },
    { label: 'Emergencias', value: stats.emergency, icon: AlertTriangle, color: 'text-red-800' },
    { label: 'Offline', value: stats.offline, icon: Wifi, color: 'text-gray-600' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <Icon className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;