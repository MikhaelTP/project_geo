import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Wifi, AlertTriangle, Car, Eye, EyeOff, RefreshCw, Plus, Minus, Home, Hospital, Building, Fuel, User, Search, Filter, Download } from 'lucide-react';
import { FaMotorcycle } from 'react-icons/fa';

const RealMirafloresMap = () => {
  const [mapInitialized, setMapInitialized] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showVehicleList, setShowVehicleList] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Datos simulados de vehículos en coordenadas reales de Miraflores
  const vehicles = [
    {
      id: 1,
      plate: 'ABC-123',
      type: 'pickup',
      name: 'Camioneta Serenazgo',
      driver: 'Juan Pérez',
      status: 'En ruta',
      speed: 25,
      fuel: 85,
      lat: -12.1215,
      lng: -77.0285,
      direction: 45,
      color: '#3B82F6',
      icon: Car,
      route: 'Patrullaje Centro',
      lastUpdate: '10:30:15'
    },
    {
      id: 2,
      plate: 'XYZ-456',
      type: 'motorcycle',
      name: 'Moto Serenazgo',
      driver: 'María García',
      status: 'En ruta',
      speed: 18,
      fuel: 72,
      lat: -12.1201,
      lng: -77.0295,
      direction: 180,
      color: '#F59E0B',
      icon: FaMotorcycle,
      route: 'Respuesta Rápida',
      lastUpdate: '10:29:42'
    },
    {
      id: 3,
      plate: 'K9-789',
      type: 'k9',
      name: 'Unidad Canina',
      driver: 'Carlos López',
      status: 'Detenido',
      speed: 0,
      fuel: 65,
      lat: -12.1180,
      lng: -77.0320,
      direction: 90,
      color: '#10B981',
      icon: User,
      route: 'Malecón',
      lastUpdate: '10:25:18'
    },
    {
      id: 4,
      plate: 'DEF-789',
      type: 'pickup',
      name: 'Camioneta Limpieza',
      driver: 'Ana Martínez',
      status: 'En ruta',
      speed: 12,
      fuel: 45,
      lat: -12.1250,
      lng: -77.0270,
      direction: 270,
      color: '#8B5CF6',
      icon: Car,
      route: 'Av. Pardo',
      lastUpdate: '10:28:33'
    },
    {
      id: 5,
      plate: 'GHI-012',
      type: 'motorcycle',
      name: 'Moto Fiscalización',
      driver: 'Luis Torres',
      status: 'En ruta',
      speed: 22,
      fuel: 90,
      lat: -12.1190,
      lng: -77.0310,
      direction: 135,
      color: '#EF4444',
      icon: FaMotorcycle,
      route: 'Zona Comercial',
      lastUpdate: '10:30:05'
    }
  ];

  // Puntos de interés reales de Miraflores
  const pointsOfInterest = [
    { name: 'Municipalidad de Miraflores', lat: -12.1201, lng: -77.0282, type: 'government', icon: Building },
    { name: 'Parque Kennedy', lat: -12.1210, lng: -77.0295, type: 'park', icon: Home },
    { name: 'Larcomar', lat: -12.1320, lng: -77.0420, type: 'shopping', icon: Building },
    { name: 'Malecón', lat: -12.1180, lng: -77.0350, type: 'waterfront', icon: MapPin },
    { name: 'Hospital Nacional', lat: -12.1200, lng: -77.0290, type: 'hospital', icon: Hospital }
  ];

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesStatus = filterStatus === 'all' || vehicle.status.toLowerCase().includes(filterStatus.toLowerCase());
    const matchesSearch = vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'En ruta': return '#10B981';
      case 'Detenido': return '#EF4444';
      case 'Mantenimiento': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const VehicleMarker = ({ vehicle, isSelected, onClick }) => {
    const Icon = vehicle.icon;
    return (
      <div
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 ${
          isSelected ? 'scale-125 z-50' : 'z-40'
        }`}
        style={{
          left: `${((vehicle.lng + 77.0500) * 2000)}px`,
          top: `${((vehicle.lat + 12.1600) * 2000)}px`
        }}
        onClick={() => onClick(vehicle)}
      >
        <div
          className="relative p-2 rounded-full shadow-lg border-2 border-white"
          style={{ backgroundColor: vehicle.color }}
        >
          <Icon className="w-4 h-4 text-white" />
          {vehicle.status === 'En ruta' && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border border-white"></div>
          )}
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-50">
          {vehicle.plate} - {vehicle.speed} km/h
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Panel lateral izquierdo */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${showVehicleList ? 'w-80' : 'w-12'} flex flex-col`}>
        {/* Header del panel */}
        <div className="p-4 border-b border-gray-200 bg-green-600 text-white">
          <div className="flex items-center justify-between">
            {showVehicleList && (
              <div>
                <h2 className="text-lg font-semibold">CREAR SUB USUARIOS</h2>
                <p className="text-sm opacity-90">Gestión de Unidades</p>
              </div>
            )}
            <button
              onClick={() => setShowVehicleList(!showVehicleList)}
              className="p-2 hover:bg-green-700 rounded"
            >
              {showVehicleList ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Contenido del panel */}
        {showVehicleList && (
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Filtros y búsqueda */}
            <div className="p-4 border-b border-gray-200">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar vehículo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">Todos los estados</option>
                  <option value="en ruta">En ruta</option>
                  <option value="detenido">Detenido</option>
                  <option value="mantenimiento">Mantenimiento</option>
                </select>
              </div>
            </div>

            {/* Lista de vehículos */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <div className="space-y-2">
                  {filteredVehicles.map(vehicle => {
                    const Icon = vehicle.icon;
                    return (
                      <div
                        key={vehicle.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                          selectedVehicle?.id === vehicle.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedVehicle(vehicle)}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className="p-2 rounded-full"
                            style={{ backgroundColor: vehicle.color, color: 'white' }}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {vehicle.plate}
                              </p>
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: getStatusColor(vehicle.status) }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{vehicle.driver}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-gray-400">{vehicle.speed} km/h</span>
                              <span className="text-xs text-gray-400">{vehicle.fuel}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Área principal del mapa */}
      <div className="flex-1 relative">
        {/* Controles del mapa */}
        <div className="absolute top-4 left-4 z-50 space-y-2">
          <div className="bg-white rounded-lg shadow-lg p-2 flex space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded">
              <RefreshCw className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Controles de zoom */}
        <div className="absolute top-4 right-4 z-50 bg-white rounded-lg shadow-lg">
          <button className="block p-3 hover:bg-gray-100 border-b">
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
          <button className="block p-3 hover:bg-gray-100">
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Simulación del mapa de Miraflores */}
        <div className="w-full h-full bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 relative overflow-hidden">
          {/* Fondo océano Pacífico */}
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-blue-400 via-blue-300 to-blue-200 opacity-60"></div>
          
          {/* Calles principales simuladas */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Av. Pardo */}
            <line x1="200" y1="100" x2="200" y2="500" stroke="#4B5563" strokeWidth="3" opacity="0.7" />
            {/* Av. Larco */}
            <line x1="300" y1="100" x2="300" y2="500" stroke="#4B5563" strokeWidth="3" opacity="0.7" />
            {/* Av. Arequipa */}
            <line x1="150" y1="100" x2="150" y2="500" stroke="#4B5563" strokeWidth="3" opacity="0.7" />
            {/* Malecón */}
            <line x1="400" y1="100" x2="400" y2="500" stroke="#4B5563" strokeWidth="4" opacity="0.7" />
            {/* Calles transversales */}
            <line x1="100" y1="200" x2="450" y2="200" stroke="#4B5563" strokeWidth="2" opacity="0.5" />
            <line x1="100" y1="300" x2="450" y2="300" stroke="#4B5563" strokeWidth="2" opacity="0.5" />
            <line x1="100" y1="400" x2="450" y2="400" stroke="#4B5563" strokeWidth="2" opacity="0.5" />
          </svg>

          {/* Etiquetas de calles */}
          <div className="absolute top-32 left-44 text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow z-30">
            Av. Pardo
          </div>
          <div className="absolute top-32 left-64 text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow z-30">
            Av. Larco
          </div>
          <div className="absolute top-32 left-80 text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow z-30">
            Malecón
          </div>

          {/* Puntos de interés */}
          {pointsOfInterest.map((poi, index) => {
            const Icon = poi.icon;
            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
                style={{
                  left: `${((poi.lng + 77.0500) * 2000)}px`,
                  top: `${((poi.lat + 12.1600) * 2000)}px`
                }}
              >
                <div className="p-2 bg-gray-700 text-white rounded-full shadow-lg">
                  <Icon className="w-3 h-3" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                  {poi.name}
                </div>
              </div>
            );
          })}

          {/* Vehículos en el mapa */}
          {vehicles.map(vehicle => (
            <VehicleMarker
              key={vehicle.id}
              vehicle={vehicle}
              isSelected={selectedVehicle?.id === vehicle.id}
              onClick={setSelectedVehicle}
            />
          ))}

          {/* Información del mapa */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 z-50">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Distrito de Miraflores</p>
                <p className="text-xs text-gray-500">Lima, Perú - {vehicles.length} unidades activas</p>
                <p className="text-xs text-gray-500">Última actualización: {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>

          {/* Leyenda */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50 max-w-xs">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Leyenda</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Camioneta Serenazgo</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Moto Serenazgo</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Unidad Canina</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Vehículo Municipal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Fiscalización</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel de información del vehículo seleccionado */}
        {selectedVehicle && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 z-50 min-w-80">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{selectedVehicle.plate}</h3>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Conductor</p>
                <p className="font-medium">{selectedVehicle.driver}</p>
              </div>
              <div>
                <p className="text-gray-600">Estado</p>
                <p className="font-medium" style={{ color: getStatusColor(selectedVehicle.status) }}>
                  {selectedVehicle.status}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Velocidad</p>
                <p className="font-medium">{selectedVehicle.speed} km/h</p>
              </div>
              <div>
                <p className="text-gray-600">Combustible</p>
                <p className="font-medium">{selectedVehicle.fuel}%</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Ruta</p>
                <p className="font-medium">{selectedVehicle.route}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Última actualización</p>
                <p className="font-medium">{selectedVehicle.lastUpdate}</p>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                Seguir
              </button>
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                Historial
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealMirafloresMap;