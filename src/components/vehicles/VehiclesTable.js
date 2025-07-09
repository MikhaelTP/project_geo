// src/components/vehicles/VehiclesTable.js
import React from 'react';
import { Wifi, Download } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import VehicleIcon from '../common/VehicleIcon';

const VehiclesTable = ({ vehicles, onSelectVehicle }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conductor/Dueño</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Velocidad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Combustible</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ruta</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Señal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vehicles.map(vehicle => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <VehicleIcon type={vehicle.type} color={vehicle.color} />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{vehicle.plate}</div>
                      <div className="text-sm text-gray-500">{vehicle.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.driver}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={vehicle.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.speed} km/h</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                      <div 
                        className={`h-full ${vehicle.fuel > 20 ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ width: `${vehicle.fuel}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-900">{vehicle.fuel}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.route}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Wifi className={`w-4 h-4 mr-1 ${vehicle.signal > 70 ? 'text-green-500' : vehicle.signal > 40 ? 'text-yellow-500' : 'text-red-500'}`} />
                    <span className="text-sm text-gray-900">{vehicle.signal}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => onSelectVehicle(vehicle)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Ver
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    Rastrear
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehiclesTable;