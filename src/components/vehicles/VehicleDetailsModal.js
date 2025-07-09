// src/components/vehicles/VehicleDetailsModal.js
import React from 'react';
import { 
  XCircle, Users, Eye, Wifi, Battery, ThermometerSun, Fuel ,CheckCircle, Activity, AlertTriangle 
} from 'lucide-react';

const VehicleDetailsModal = ({ vehicle, onClose }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'En ruta': return 'text-green-600 bg-green-100';
      case 'Detenido': return 'text-red-600 bg-red-100';
      case 'Mantenimiento': return 'text-yellow-600 bg-yellow-100';
      case 'Emergencia': return 'text-red-800 bg-red-200';
      case 'Offline': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'En ruta': return <CheckCircle className="w-4 h-4" />;
      case 'Detenido': return <XCircle className="w-4 h-4" />;
      case 'Mantenimiento': return <Activity className="w-4 h-4" />;
      case 'Emergencia': return <AlertTriangle className="w-4 h-4" />;
      case 'Offline': return <Wifi className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
                Detalles del Vehículo {vehicle.plate}
            </h2>
            <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
            >
                <XCircle className="w-6 h-6" />
            </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Información General</h3>
                <div className="space-y-2">
                    <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tipo:</span>
                    <span className="text-sm font-medium text-gray-900">{vehicle.name}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Conductor:</span>
                    <span className="text-sm font-medium text-gray-900">{vehicle.driver}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-sm text-2-600">Ruta:</span>
                    <span className="text-sm font-medium text-gray-900">{vehicle.route}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Estado:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                        {getStatusIcon(vehicle.status)}
                        <span className="ml-1">{vehicle.status}</span>
                    </span>
                    </div>
                </div>
                </div>

                <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Métricas en Tiempo Real</h3>
                <div className="space-y-2">
                    <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Velocidad actual:</span>
                    <span className="text-sm font-medium text-gray-900">{vehicle.speed} km/h</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Velocidad máxima:</span>
                    <span className="text-sm font-medium text-gray-900">{vehicle.maxSpeed} km/h</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Distancia recorrida:</span>
                    <span className="text-sm font-medium text-gray-900">{vehicle.distance.toFixed(1)} km</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Odómetro:</span>
                    <span className="text-sm font-medium text-gray-900">{vehicle.odometer.toLocaleString()} km</span>
                    </div>
                </div>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Estado del Sistema</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Fuel className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Combustible</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className={`h-full ${vehicle.fuel > 20 ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ width: `${vehicle.fuel}%` }}
                        ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{vehicle.fuel}%</span>
                    </div>
                    </div>

                    <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Battery className="w-4 h-4 text-gray-400" />
                        <span className="text-2-gray-600">Batería</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className={`h-full ${vehicle.battery > 20 ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ width: `${vehicle.battery}%` }}
                        ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{vehicle.battery}%</span>
                    </div>
                    </div>

                    <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Wifi className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Señal GPS</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className={`h-full ${vehicle.signal > 70 ? 'bg-green-500' : vehicle.signal > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${vehicle.signal}%` }}
                        ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{vehicle.signal}%</span>
                    </div>
                    </div>

                    <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <ThermometerSun className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Temperatura</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{vehicle.temperature}°C</span>
                    </div>
                </div>
                </div>

                <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Ubicación</h3>
                <div className="space-y-2">
                    <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Latitud:</span>
                    <span className="text-sm font-medium text-gray-900">{vehicle.lat.toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Longitud:</span>
                    <span className="text-sm font-medium text-gray-900">{vehicle.lng.toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Última actualización:</span>
                    <span className="text-sm font-medium text-gray-900">{vehicle.lastUpdate}</span>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div className="mt-6 flex space-x-3">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Rastrear en Mapa
            </button>
            <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Historial de Rutas
            </button>
            <button className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
                Generar Reporte
            </button>
            </div>
        </div>
        </div>
    </div>
  );
};

export default VehicleDetailsModal;