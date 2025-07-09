// src/components/common/VehicleIcon.js
import React from 'react';
import { Bus, Car, Dog,Truck, Bike } from 'lucide-react';
import { FaMotorcycle } from 'react-icons/fa';
const VehicleIcon = ({ type, color = 'blue' }) => {
  const iconMap = {
    bus: Car,
    taxi: FaMotorcycle,
    truck: Dog
  };

  const Icon = iconMap[type] || Car;
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className={`p-2 rounded-full ${colorClasses[color]}`}>
      <Icon className="w-4 h-4" />
    </div>
  );
};

export default VehicleIcon;