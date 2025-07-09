// src/components/common/StatusBadge.js
import React from 'react';
import { CheckCircle, XCircle, Activity, AlertTriangle, Wifi } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    'En ruta': {
      color: 'text-green-600 bg-green-100',
      icon: <CheckCircle className="w-4 h-4" />
    },
    'Detenido': {
      color: 'text-red-600 bg-red-100',
      icon: <XCircle className="w-4 h-4" />
    },
    'Mantenimiento': {
      color: 'text-yellow-600 bg-yellow-100',
      icon: <Activity className="w-4 h-4" />
    },
    'Emergencia': {
      color: 'text-red-800 bg-red-200',
      icon: <AlertTriangle className="w-4 h-4" />
    },
    'Offline': {
      color: 'text-gray-600 bg-gray-100',
      icon: <Wifi className="w-4 h-4" />
    }
  };

  const config = statusConfig[status] || {
    color: 'text-gray-600 bg-gray-100',
    icon: <Activity className="w-4 h-4" />
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.icon}
      <span className="ml-1">{status}</span>
    </span>
  );
};

export default StatusBadge;