// src/components/events/GeofencesManagement.js
import React, { useState } from 'react';
import { MapPin, Plus, Edit, Trash2, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const GeofencesManagement = () => {
  const [geofences, setGeofences] = useState([
    {
      id: 1,
      name: 'Zona Segura - Parque Central',
      type: 'safe',
      shape: 'circle',
      center: { lat: -12.1215, lng: -77.0285 },
      radius: 200,
      color: '#10B981',
      description: 'Área del parque central de Miraflores',
      alerts: ['entry', 'exit'],
      active: true
    },
    {
      id: 2,
      name: 'Zona Restringida - Malecón',
      type: 'restricted',
      shape: 'polygon',
      coordinates: [
        { lat: -12.1180, lng: -77.0320 },
        { lat: -12.1185, lng: -77.0310 },
        { lat: -12.1190, lng: -77.0315 },
        { lat: -12.1185, lng: -77.0325 }
      ],
      color: '#EF4444',
      description: 'Área restringida del malecón',
      alerts: ['entry'],
      active: true
    },
    {
      id: 3,
      name: 'Zona de Patrullaje - Av. Pardo',
      type: 'patrol',
      shape: 'rectangle',
      bounds: {
        north: -12.1200,
        south: -12.1250,
        east: -77.0250,
        west: -77.0300
      },
      color: '#3B82F6',
      description: 'Zona principal de patrullaje',
      alerts: ['entry', 'exit', 'speed'],
      active: true
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingGeofence, setEditingGeofence] = useState(null);
  const [newGeofence, setNewGeofence] = useState({
    name: '',
    type: 'safe',
    shape: 'circle',
    center: { lat: -12.1215, lng: -77.0285 },
    radius: 100,
    color: '#10B981',
    description: '',
    alerts: ['entry'],
    active: true
  });

  const geofenceTypes = [
    { value: 'safe', label: 'Zona Segura', color: '#10B981', icon: CheckCircle },
    { value: 'restricted', label: 'Zona Restringida', color: '#EF4444', icon: AlertTriangle },
    { value: 'patrol', label: 'Zona de Patrullaje', color: '#3B82F6', icon: Shield }
  ];

  const alertTypes = [
    { value: 'entry', label: 'Entrada' },
    { value: 'exit', label: 'Salida' },
    { value: 'speed', label: 'Exceso de Velocidad' },
    { value: 'stop', label: 'Parada Prolongada' }
  ];

  const handleCreateGeofence = (e) => {
    e.preventDefault();
    const geofence = {
      id: Date.now(),
      ...newGeofence
    };
    setGeofences([...geofences, geofence]);
    setNewGeofence({
      name: '',
      type: 'safe',
      shape: 'circle',
      center: { lat: -12.1215, lng: -77.0285 },
      radius: 100,
      color: '#10B981',
      description: '',
      alerts: ['entry'],
      active: true
    });
    setShowCreateForm(false);
  };

  const handleEditGeofence = (e) => {
    e.preventDefault();
    setGeofences(geofences.map(g => 
      g.id === editingGeofence.id ? editingGeofence : g
    ));
    setEditingGeofence(null);
  };

  const deleteGeofence = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta geo cerca?')) {
      setGeofences(geofences.filter(g => g.id !== id));
    }
  };

  const toggleGeofenceStatus = (id) => {
    setGeofences(geofences.map(g => 
      g.id === id ? { ...g, active: !g.active } : g
    ));
  };

  const getTypeConfig = (type) => {
    return geofenceTypes.find(t => t.value === type) || geofenceTypes[0];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Gestión de Geo Cercas</h2>
            <p className="text-sm text-gray-500 mt-1">Crear y administrar zonas geográficas en Miraflores</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Geo Cerca</span>
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <MapPin className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Geo Cercas</p>
              <p className="text-2xl font-bold text-gray-900">{geofences.length}</p>
            </div>
          </div>
        </div>
        {geofenceTypes.map(type => {
          const count = geofences.filter(g => g.type === type.value).length;
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

      {/* Lista de Geo Cercas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Geo Cerca</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Forma</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alertas</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {geofences.map(geofence => {
              const typeConfig = getTypeConfig(geofence.type);
              const TypeIcon = typeConfig.icon;
              
              return (
                <tr key={geofence.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: geofence.color }}
                      ></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{geofence.name}</div>
                        <div className="text-sm text-gray-500">{geofence.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      <TypeIcon className="w-4 h-4 mr-1" style={{ color: typeConfig.color }} />
                      {typeConfig.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {geofence.shape === 'circle' ? 'Circular' : 
                     geofence.shape === 'rectangle' ? 'Rectangular' : 'Polígono'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {geofence.alerts.map(alert => (
                      <span key={alert} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-1">
                        {alertTypes.find(a => a.value === alert)?.label}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      geofence.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {geofence.active ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setEditingGeofence(geofence)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleGeofenceStatus(geofence.id)}
                      className={`mr-3 ${geofence.active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                    >
                      {geofence.active ? 'Desactivar' : 'Activar'}
                    </button>
                    <button
                      onClick={() => deleteGeofence(geofence.id)}
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

      {/* Modal para crear geo cerca */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Crear Nueva Geo Cerca</h3>
            <form onSubmit={handleCreateGeofence} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                  <input
                    type="text"
                    required
                    value={newGeofence.name}
                    onChange={(e) => setNewGeofence({...newGeofence, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
                  <select
                    value={newGeofence.type}
                    onChange={(e) => {
                      const selectedType = geofenceTypes.find(t => t.value === e.target.value);
                      setNewGeofence({...newGeofence, type: e.target.value, color: selectedType.color});
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {geofenceTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Forma *</label>
                  <select
                    value={newGeofence.shape}
                    onChange={(e) => setNewGeofence({...newGeofence, shape: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="circle">Circular</option>
                    <option value="rectangle">Rectangular</option>
                    <option value="polygon">Polígono</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Radio (metros)</label>
                  <input
                    type="number"
                    min="10"
                    max="5000"
                    value={newGeofence.radius}
                    onChange={(e) => setNewGeofence({...newGeofence, radius: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <input
                    type="color"
                    value={newGeofence.color}
                    onChange={(e) => setNewGeofence({...newGeofence, color: e.target.value})}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={newGeofence.description}
                  onChange={(e) => setNewGeofence({...newGeofence, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alertas</label>
                <div className="space-y-2">
                  {alertTypes.map(alert => (
                    <label key={alert.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newGeofence.alerts.includes(alert.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewGeofence({...newGeofence, alerts: [...newGeofence.alerts, alert.value]});
                          } else {
                            setNewGeofence({...newGeofence, alerts: newGeofence.alerts.filter(a => a !== alert.value)});
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{alert.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Crear Geo Cerca
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para editar geo cerca */}
      {editingGeofence && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Editar Geo Cerca</h3>
            <form onSubmit={handleEditGeofence} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                  <input
                    type="text"
                    required
                    value={editingGeofence.name}
                    onChange={(e) => setEditingGeofence({...editingGeofence, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
                  <select
                    value={editingGeofence.type}
                    onChange={(e) => setEditingGeofence({...editingGeofence, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {geofenceTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={editingGeofence.description}
                  onChange={(e) => setEditingGeofence({...editingGeofence, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingGeofence(null)}
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

export default GeofencesManagement;