// src/components/events/PointsOfInterest.js
import React, { useState } from 'react';
import { MapPin, Plus, Edit, Trash2, Hospital, AlertTriangle, Building, Fuel, Utensils, School } from 'lucide-react';

const PointsOfInterest = () => {
  const [pointsOfInterest, setPointsOfInterest] = useState([
    {
      id: 1,
      name: 'Hospital Nacional Dos de Mayo',
      type: 'hospital',
      icon: 'hospital',
      lat: -12.1200,
      lng: -77.0290,
      address: 'Av. Grau 13, Miraflores',
      description: 'Hospital principal de emergencias',
      phone: '01-4567890',
      active: true,
      color: '#EF4444'
    },
    {
      id: 2,
      name: 'Comisaría de Miraflores',
      type: 'police',
      icon: 'police',
      lat: -12.1210,
      lng: -77.0280,
      address: 'Av. Pardo 456, Miraflores',
      description: 'Comisaría principal del distrito',
      phone: '105',
      active: true,
      color: '#3B82F6'
    },
    {
      id: 3,
      name: 'Grifo Petroperú',
      type: 'gas_station',
      icon: 'gas',
      lat: -12.1250,
      lng: -77.0300,
      address: 'Av. Larco 789, Miraflores',
      description: 'Estación de combustible',
      phone: '01-2345678',
      active: true,
      color: '#F59E0B'
    },
    {
      id: 4,
      name: 'Colegio San Antonio',
      type: 'school',
      icon: 'school',
      lat: -12.1180,
      lng: -77.0270,
      address: 'Jr. Lima 123, Miraflores',
      description: 'Centro educativo primario y secundario',
      phone: '01-3456789',
      active: true,
      color: '#10B981'
    },
    {
      id: 5,
      name: 'Banco de Crédito',
      type: 'bank',
      icon: 'bank',
      lat: -12.1220,
      lng: -77.0285,
      address: 'Av. Pardo 321, Miraflores',
      description: 'Sucursal bancaria principal',
      phone: '01-4567891',
      active: true,
      color: '#1E40AF'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPOI, setEditingPOI] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const poiTypes = [
    { value: 'hospital', label: 'Hospital', icon: Hospital, color: '#EF4444' },
    { value: 'police', label: 'Comisaría', icon: AlertTriangle, color: '#3B82F6' },
    { value: 'gas_station', label: 'Grifo', icon: Fuel, color: '#F59E0B' },
    { value: 'school', label: 'Colegio', icon: School, color: '#10B981' },
    { value: 'bank', label: 'Banco', icon: Building, color: '#1E40AF' },
    { value: 'restaurant', label: 'Restaurante', icon: Utensils, color: '#F97316' }
  ];

  const [newPOI, setNewPOI] = useState({
    name: '',
    type: 'hospital',
    icon: 'hospital',
    lat: -12.1215,
    lng: -77.0285,
    address: '',
    description: '',
    phone: '',
    active: true,
    color: '#EF4444'
  });

  const filteredPOIs = pointsOfInterest.filter(poi => 
    filterType === 'all' || poi.type === filterType
  );

  const handleCreatePOI = (e) => {
    e.preventDefault();
    const poi = {
      id: Date.now(),
      ...newPOI
    };
    setPointsOfInterest([...pointsOfInterest, poi]);
    setNewPOI({
      name: '',
      type: 'hospital',
      icon: 'hospital',
      lat: -12.1215,
      lng: -77.0285,
      address: '',
      description: '',
      phone: '',
      active: true,
      color: '#EF4444'
    });
    setShowCreateForm(false);
  };

  const handleEditPOI = (e) => {
    e.preventDefault();
    setPointsOfInterest(pointsOfInterest.map(poi => 
      poi.id === editingPOI.id ? editingPOI : poi
    ));
    setEditingPOI(null);
  };

  const deletePOI = (id) => {
    if (window.confirm('¿Está seguro de eliminar este punto de interés?')) {
      setPointsOfInterest(pointsOfInterest.filter(poi => poi.id !== id));
    }
  };

  const togglePOIStatus = (id) => {
    setPointsOfInterest(pointsOfInterest.map(poi => 
      poi.id === id ? { ...poi, active: !poi.active } : poi
    ));
  };

  const getTypeConfig = (type) => {
    return poiTypes.find(t => t.value === type) || poiTypes[0];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Puntos de Interés</h2>
            <p className="text-sm text-gray-500 mt-1">Gestionar ubicaciones importantes en Miraflores</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Punto de Interés</span>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filtrar por tipo:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="all">Todos</option>
            {poiTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <MapPin className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total POIs</p>
              <p className="text-2xl font-bold text-gray-900">{pointsOfInterest.length}</p>
            </div>
          </div>
        </div>
        {poiTypes.slice(0, 5).map(type => {
          const count = pointsOfInterest.filter(poi => poi.type === type.value).length;
          const Icon = type.icon;
          return (
            <div key={type.value} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <Icon className="w-8 h-8" style={{ color: type.color }} />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">{type.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lista de POIs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Punto de Interés</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPOIs.map(poi => {
              const typeConfig = getTypeConfig(poi.type);
              const TypeIcon = typeConfig.icon;
              
              return (
                <tr key={poi.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${poi.color}20` }}
                      >
                        <TypeIcon className="w-5 h-5" style={{ color: poi.color }} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{poi.name}</div>
                        <div className="text-sm text-gray-500">{poi.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: `${poi.color}20`, color: poi.color }}>
                      {typeConfig.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{poi.address}</div>
                    <div className="text-sm text-gray-500">{poi.lat.toFixed(4)}, {poi.lng.toFixed(4)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {poi.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      poi.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {poi.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setEditingPOI(poi)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => togglePOIStatus(poi.id)}
                      className={`mr-3 ${poi.active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                    >
                      {poi.active ? 'Desactivar' : 'Activar'}
                    </button>
                    <button
                      onClick={() => deletePOI(poi.id)}
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

      {/* Modal para crear POI */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Crear Nuevo Punto de Interés</h3>
            <form onSubmit={handleCreatePOI} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                  <input
                    type="text"
                    required
                    value={newPOI.name}
                    onChange={(e) => setNewPOI({...newPOI, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {poiTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </input>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitud *</label>
                  <input
                    type="number"
                    step="0.000001"
                    required
                    value={editingPOI.lat}
                    onChange={(e) => setEditingPOI({...editingPOI, lat: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitud *</label>
                  <input
                    type="number"
                    step="0.000001"
                    required
                    value={editingPOI.lng}
                    onChange={(e) => setEditingPOI({...editingPOI, lng: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <input
                    type="text"
                    value={editingPOI.address}
                    onChange={(e) => setEditingPOI({...editingPOI, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    value={editingPOI.phone}
                    onChange={(e) => setEditingPOI({...editingPOI, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={editingPOI.description}
                  onChange={(e) => setEditingPOI({...editingPOI, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingPOI(null)}
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

export default PointsOfInterest;
                