// src/components/admin/VehicleManagement.js
import React, { useState, useEffect } from 'react';
import { Car, Plus, Edit, Trash2, Search, Save, X } from 'lucide-react';
import { FaMotorcycle } from 'react-icons/fa';
import { Bus, Dog, Truck } from 'lucide-react';

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Tipos de vehículos disponibles
  const vehicleTypes = [
    { 
      value: 'bus', 
      label: 'Camioneta de Serenazgo', 
      icon: Car,
      defaultColor: 'blue',
      description: 'Vehículo principal para patrullaje'
    },
    { 
      value: 'taxi', 
      label: 'Moto de Serenazgo', 
      icon: FaMotorcycle,
      defaultColor: 'yellow',
      description: 'Vehículo ágil para respuesta rápida'
    },
    { 
      value: 'truck', 
      label: 'Perro Policía', 
      icon: Dog,
      defaultColor: 'green',
      description: 'Unidad canina especializada'
    }
  ];

  const colorOptions = [
    { value: 'blue', label: 'Azul', class: 'bg-blue-500' },
    { value: 'yellow', label: 'Amarillo', class: 'bg-yellow-500' },
    { value: 'green', label: 'Verde', class: 'bg-green-500' },
    { value: 'orange', label: 'Naranja', class: 'bg-orange-500' },
    { value: 'red', label: 'Rojo', class: 'bg-red-500' },
    { value: 'gray', label: 'Gris', class: 'bg-gray-500' }
  ];

  const [newVehicle, setNewVehicle] = useState({
    plate: '',
    type: 'bus',
    name: '',
    brand: '',
    model: '',
    year: '',
    color: 'blue',
    driver: '',
    route: '',
    capacity: '',
    fuel_type: 'gasoline',
    notes: ''
  });

  // Cargar vehículos existentes
  useEffect(() => {
    const existingVehicles = [
      {
        id: 1,
        plate: 'ABC-123',
        type: 'bus',
        name: 'Camioneta de Serenazgo',
        brand: 'Toyota',
        model: 'Hilux',
        year: '2022',
        color: 'blue',
        driver: 'Juan Pérez',
        route: 'Lima Centro - Callao',
        capacity: '4 personas',
        fuel_type: 'gasoline',
        notes: 'Vehículo principal del turno mañana'
      },
      {
        id: 2,
        plate: 'XYZ-456',
        type: 'taxi',
        name: 'Moto de Serenazgo',
        brand: 'Honda',
        model: 'CB190R',
        year: '2021',
        color: 'yellow',
        driver: 'María García',
        route: 'Miraflores - San Isidro',
        capacity: '2 personas',
        fuel_type: 'gasoline',
        notes: 'Unidad de respuesta rápida'
      },
      {
        id: 3,
        plate: 'K9-789',
        type: 'truck',
        name: 'Perro Policía',
        brand: 'Unidad Canina',
        model: 'Pastor Alemán',
        year: '2023',
        color: 'green',
        driver: 'Carlos López',
        route: 'La Victoria - Ate',
        capacity: '1 can + handler',
        fuel_type: 'none',
        notes: 'Especializado en detección de drogas'
      }
    ];
    setVehicles(existingVehicles);
  }, []);

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || vehicle.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleCreateVehicle = (e) => {
    e.preventDefault();
    const vehicle = {
      id: Date.now(),
      ...newVehicle,
      plate: newVehicle.plate.toUpperCase()
    };
    setVehicles([...vehicles, vehicle]);
    resetForm();
    setShowCreateForm(false);
  };

  const handleEditVehicle = (e) => {
    e.preventDefault();
    setVehicles(vehicles.map(v => 
      v.id === editingVehicle.id ? { ...editingVehicle, plate: editingVehicle.plate.toUpperCase() } : v
    ));
    setEditingVehicle(null);
  };

  const deleteVehicle = (vehicleId) => {
    if (window.confirm('¿Está seguro de eliminar este vehículo?')) {
      setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
    }
  };

  const resetForm = () => {
    setNewVehicle({
      plate: '',
      type: 'bus',
      name: '',
      brand: '',
      model: '',
      year: '',
      color: 'blue',
      driver: '',
      route: '',
      capacity: '',
      fuel_type: 'gasoline',
      notes: ''
    });
  };

  const getVehicleTypeConfig = (type) => {
    return vehicleTypes.find(t => t.value === type) || vehicleTypes[0];
  };

  const getColorConfig = (color) => {
    return colorOptions.find(c => c.value === color) || colorOptions[0];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Gestión de Vehículos</h2>
            <p className="text-sm text-gray-500 mt-1">Administrar información de unidades municipales</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Vehículo</span>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por placa, marca, modelo, conductor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="all">Todos los tipos</option>
            {vehicleTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Car className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Vehículos</p>
              <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
            </div>
          </div>
        </div>
        {vehicleTypes.map(type => {
          const count = vehicles.filter(vehicle => vehicle.type === type.value).length;
          const Icon = type.icon;
          return (
            <div key={type.value} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <Icon className="w-8 h-8 text-gray-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">{type.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabla de vehículos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especificaciones</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asignación</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredVehicles.map(vehicle => {
              const typeConfig = getVehicleTypeConfig(vehicle.type);
              const colorConfig = getColorConfig(vehicle.color);
              const TypeIcon = typeConfig.icon;
              
              return (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${colorConfig.class} bg-opacity-20`}>
                        <TypeIcon className={`h-5 w-5 ${colorConfig.class.replace('bg-', 'text-')}`} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{vehicle.plate}</div>
                        <div className="text-sm text-gray-500">{vehicle.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vehicle.brand} {vehicle.model}</div>
                    <div className="text-sm text-gray-500">Año: {vehicle.year}</div>
                    <div className="text-sm text-gray-500">Color: {colorConfig.label}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Conductor: {vehicle.driver}</div>
                    <div className="text-sm text-gray-500">Ruta: {vehicle.route}</div>
                    <div className="text-sm text-gray-500">Capacidad: {vehicle.capacity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setEditingVehicle(vehicle)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteVehicle(vehicle.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal para crear vehículo */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Crear Nuevo Vehículo</h3>
            <form onSubmit={handleCreateVehicle} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Placa *</label>
                  <input
                    type="text"
                    required
                    value={newVehicle.plate}
                    onChange={(e) => setNewVehicle({...newVehicle, plate: e.target.value.toUpperCase()})}
                    placeholder="ABC-123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Vehículo *</label>
                  <select
                    required
                    value={newVehicle.type}
                    onChange={(e) => {
                      const selectedType = vehicleTypes.find(t => t.value === e.target.value);
                      setNewVehicle({
                        ...newVehicle, 
                        type: e.target.value,
                        name: selectedType.label,
                        color: selectedType.defaultColor
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {vehicleTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marca *</label>
                  <input
                    type="text"
                    required
                    value={newVehicle.brand}
                    onChange={(e) => setNewVehicle({...newVehicle, brand: e.target.value})}
                    placeholder="Toyota, Honda, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Modelo *</label>
                  <input
                    type="text"
                    required
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                    placeholder="Hilux, CB190R, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Año</label>
                  <input
                    type="number"
                    min="1990"
                    max="2030"
                    value={newVehicle.year}
                    onChange={(e) => setNewVehicle({...newVehicle, year: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <select
                    value={newVehicle.color}
                    onChange={(e) => setNewVehicle({...newVehicle, color: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {colorOptions.map(color => (
                      <option key={color.value} value={color.value}>{color.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Conductor/Responsable</label>
                  <input
                    type="text"
                    value={newVehicle.driver}
                    onChange={(e) => setNewVehicle({...newVehicle, driver: e.target.value})}
                    placeholder="Nombre del conductor"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ruta Asignada</label>
                  <input
                    type="text"
                    value={newVehicle.route}
                    onChange={(e) => setNewVehicle({...newVehicle, route: e.target.value})}
                    placeholder="Lima Centro - Callao"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad</label>
                  <input
                    type="text"
                    value={newVehicle.capacity}
                    onChange={(e) => setNewVehicle({...newVehicle, capacity: e.target.value})}
                    placeholder="4 personas"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Combustible</label>
                  <select
                    value={newVehicle.fuel_type}
                    onChange={(e) => setNewVehicle({...newVehicle, fuel_type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="gasoline">Gasolina</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Eléctrico</option>
                    <option value="hybrid">Híbrido</option>
                    <option value="none">N/A</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea
                  value={newVehicle.notes}
                  onChange={(e) => setNewVehicle({...newVehicle, notes: e.target.value})}
                  rows={3}
                  placeholder="Información adicional sobre el vehículo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Crear Vehículo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para editar vehículo */}
      {editingVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Editar Vehículo</h3>
            <form onSubmit={handleEditVehicle} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Placa *</label>
                  <input
                    type="text"
                    required
                    value={editingVehicle.plate}
                    onChange={(e) => setEditingVehicle({...editingVehicle, plate: e.target.value.toUpperCase()})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Vehículo *</label>
                  <select
                    required
                    value={editingVehicle.type}
                    onChange={(e) => {
                      const selectedType = vehicleTypes.find(t => t.value === e.target.value);
                      setEditingVehicle({
                        ...editingVehicle, 
                        type: e.target.value,
                        name: selectedType.label
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {vehicleTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marca *</label>
                  <input
                    type="text"
                    required
                    value={editingVehicle.brand}
                    onChange={(e) => setEditingVehicle({...editingVehicle, brand: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Modelo *</label>
                  <input
                    type="text"
                    required
                    value={editingVehicle.model}
                    onChange={(e) => setEditingVehicle({...editingVehicle, model: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Año</label>
                  <input
                    type="number"
                    min="1990"
                    max="2030"
                    value={editingVehicle.year}
                    onChange={(e) => setEditingVehicle({...editingVehicle, year: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <select
                    value={editingVehicle.color}
                    onChange={(e) => setEditingVehicle({...editingVehicle, color: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {colorOptions.map(color => (
                      <option key={color.value} value={color.value}>{color.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Conductor/Responsable</label>
                  <input
                    type="text"
                    value={editingVehicle.driver}
                    onChange={(e) => setEditingVehicle({...editingVehicle, driver: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ruta Asignada</label>
                  <input
                    type="text"
                    value={editingVehicle.route}
                    onChange={(e) => setEditingVehicle({...editingVehicle, route: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacidad</label>
                  <input
                    type="text"
                    value={editingVehicle.capacity}
                    onChange={(e) => setEditingVehicle({...editingVehicle, capacity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Combustible</label>
                  <select
                    value={editingVehicle.fuel_type}
                    onChange={(e) => setEditingVehicle({...editingVehicle, fuel_type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="gasoline">Gasolina</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Eléctrico</option>
                    <option value="hybrid">Híbrido</option>
                    <option value="none">N/A</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea
                  value={editingVehicle.notes}
                  onChange={(e) => setEditingVehicle({...editingVehicle, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingVehicle(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleManagement;