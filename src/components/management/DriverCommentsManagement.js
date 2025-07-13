// src/components/management/DriverCommentsManagement.js
import React, { useState } from 'react';
import { User, MessageSquare, Plus, Edit, Trash2, Calendar, Clock, AlertTriangle } from 'lucide-react';

const DriverCommentsManagement = () => {
  const [activeTab, setActiveTab] = useState('drivers');
  
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: 'Juan Pérez',
      dni: '12345678',
      license: 'A2a',
      licenseExpiry: '2025-12-15',
      phone: '+51 999 123 456',
      email: 'juan.perez@miraflores.gob.pe',
      address: 'Av. Pardo 123, Miraflores',
      dateOfBirth: '1985-03-20',
      hireDate: '2020-01-15',
      status: 'active',
      shift: 'morning',
      assignedVehicles: ['ABC-123'],
      emergencyContact: {
        name: 'María Pérez',
        phone: '+51 999 654 321',
        relationship: 'Esposa'
      },
      notes: 'Conductor experimentado con excelente record'
    },
    {
      id: 2,
      name: 'María García',
      dni: '87654321',
      license: 'A1',
      licenseExpiry: '2024-08-30',
      phone: '+51 999 987 654',
      email: 'maria.garcia@miraflores.gob.pe',
      address: 'Jr. Lima 456, Miraflores',
      dateOfBirth: '1990-07-10',
      hireDate: '2021-03-10',
      status: 'active',
      shift: 'afternoon',
      assignedVehicles: ['XYZ-456'],
      emergencyContact: {
        name: 'Carlos García',
        phone: '+51 999 111 222',
        relationship: 'Padre'
      },
      notes: 'Especialista en unidades de respuesta rápida'
    },
    {
      id: 3,
      name: 'Carlos López',
      dni: '11223344',
      license: 'A2b',
      licenseExpiry: '2025-06-20',
      phone: '+51 999 333 444',
      email: 'carlos.lopez@miraflores.gob.pe',
      address: 'Av. Larco 789, Miraflores',
      dateOfBirth: '1988-11-25',
      hireDate: '2019-06-01',
      status: 'vacation',
      shift: 'night',
      assignedVehicles: ['K9-789'],
      emergencyContact: {
        name: 'Ana López',
        phone: '+51 999 555 666',
        relationship: 'Hermana'
      },
      notes: 'Especialista en manejo de unidades caninas'
    }
  ]);

  const [comments, setComments] = useState([
    {
      id: 1,
      type: 'vehicle',
      entityId: 1,
      entityName: 'ABC-123',
      title: 'Mantenimiento programado',
      content: 'Vehículo requiere cambio de aceite la próxima semana',
      priority: 'medium',
      category: 'maintenance',
      author: 'Juan Pérez',
      date: '2024-07-09',
      time: '10:30:00',
      status: 'open',
      tags: ['mantenimiento', 'aceite']
    },
    {
      id: 2,
      type: 'driver',
      entityId: 2,
      entityName: 'María García',
      title: 'Excelente desempeño',
      content: 'Conductor mostró excelente manejo durante la operación de emergencia',
      priority: 'low',
      category: 'performance',
      author: 'Supervisor Central',
      date: '2024-07-08',
      time: '16:45:00',
      status: 'resolved',
      tags: ['desempeño', 'emergencia']
    },
    {
      id: 3,
      type: 'incident',
      entityId: 1,
      entityName: 'ABC-123',
      title: 'Incidente menor',
      content: 'Roce menor en el estacionamiento, sin daños estructurales',
      priority: 'high',
      category: 'incident',
      author: 'Carlos López',
      date: '2024-07-07',
      time: '14:20:00',
      status: 'resolved',
      tags: ['incidente', 'estacionamiento']
    }
  ]);

  const [showDriverForm, setShowDriverForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [editingComment, setEditingComment] = useState(null);

  const [newDriver, setNewDriver] = useState({
    name: '',
    dni: '',
    license: '',
    licenseExpiry: '',
    phone: '',
    email: '',
    address: '',
    dateOfBirth: '',
    hireDate: '',
    status: 'active',
    shift: 'morning',
    assignedVehicles: [],
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    notes: ''
  });

  const [newComment, setNewComment] = useState({
    type: 'vehicle',
    entityId: '',
    entityName: '',
    title: '',
    content: '',
    priority: 'medium',
    category: 'general',
    author: 'Usuario Actual',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0],
    status: 'open',
    tags: []
  });

  const shiftTypes = [
    { value: 'morning', label: 'Mañana (06:00 - 14:00)' },
    { value: 'afternoon', label: 'Tarde (14:00 - 22:00)' },
    { value: 'night', label: 'Noche (22:00 - 06:00)' }
  ];

  const driverStatuses = [
    { value: 'active', label: 'Activo', color: 'bg-green-100 text-green-800' },
    { value: 'vacation', label: 'Vacaciones', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'sick', label: 'Enfermo', color: 'bg-red-100 text-red-800' },
    { value: 'suspended', label: 'Suspendido', color: 'bg-gray-100 text-gray-800' }
  ];

  const commentTypes = [
    { value: 'vehicle', label: 'Vehículo' },
    { value: 'driver', label: 'Conductor' },
    { value: 'incident', label: 'Incidente' },
    { value: 'maintenance', label: 'Mantenimiento' },
    { value: 'general', label: 'General' }
  ];

  const commentCategories = [
    { value: 'maintenance', label: 'Mantenimiento' },
    { value: 'performance', label: 'Desempeño' },
    { value: 'incident', label: 'Incidente' },
    { value: 'observation', label: 'Observación' },
    { value: 'general', label: 'General' }
  ];

  const priorityLevels = [
    { value: 'low', label: 'Baja', color: 'bg-blue-100 text-blue-800' },
    { value: 'medium', label: 'Media', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'Alta', color: 'bg-red-100 text-red-800' }
  ];

  const handleDriverSubmit = (e) => {
    e.preventDefault();
    if (editingDriver) {
      setDrivers(drivers.map(d => d.id === editingDriver.id ? editingDriver : d));
      setEditingDriver(null);
    } else {
      const driver = {
        id: Date.now(),
        ...newDriver
      };
      setDrivers([...drivers, driver]);
      setNewDriver({
        name: '',
        dni: '',
        license: '',
        licenseExpiry: '',
        phone: '',
        email: '',
        address: '',
        dateOfBirth: '',
        hireDate: '',
        status: 'active',
        shift: 'morning',
        assignedVehicles: [],
        emergencyContact: {
          name: '',
          phone: '',
          relationship: ''
        },
        notes: ''
      });
    }
    setShowDriverForm(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (editingComment) {
      setComments(comments.map(c => c.id === editingComment.id ? editingComment : c));
      setEditingComment(null);
    } else {
      const comment = {
        id: Date.now(),
        ...newComment,
        tags: newComment.tags || []
      };
      setComments([comment, ...comments]);
      setNewComment({
        type: 'vehicle',
        entityId: '',
        entityName: '',
        title: '',
        content: '',
        priority: 'medium',
        category: 'general',
        author: 'Usuario Actual',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0],
        status: 'open',
        tags: []
      });
    }
    setShowCommentForm(false);
  };

  const deleteDriver = (id) => {
    if (window.confirm('¿Está seguro de eliminar este conductor?')) {
      setDrivers(drivers.filter(d => d.id !== id));
    }
  };

  const deleteComment = (id) => {
    if (window.confirm('¿Está seguro de eliminar este comentario?')) {
      setComments(comments.filter(c => c.id !== id));
    }
  };

  const getStatusColor = (status) => {
    return driverStatuses.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    return priorityLevels.find(p => p.value === priority)?.color || 'bg-gray-100 text-gray-800';
  };

  const DriversSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Gestión de Conductores</h3>
        <button
          onClick={() => setShowDriverForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Conductor</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conductor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DNI</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Licencia</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turno</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {drivers.map(driver => (
              <tr key={driver.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                      <div className="text-sm text-gray-500">{driver.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {driver.dni}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{driver.license}</div>
                  <div className="text-sm text-gray-500">Vence: {driver.licenseExpiry}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {shiftTypes.find(s => s.value === driver.shift)?.label}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {driver.assignedVehicles.join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                    {driverStatuses.find(s => s.value === driver.status)?.label}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setEditingDriver(driver)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteDriver(driver.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CommentsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Comentarios y Observaciones</h3>
        <button
          onClick={() => setShowCommentForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Comentario</span>
        </button>
      </div>

      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-gray-400" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{comment.title}</h4>
                  <p className="text-sm text-gray-500">{commentTypes.find(t => t.value === comment.type)?.label} - {comment.entityName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(comment.priority)}`}>
                  {priorityLevels.find(p => p.value === comment.priority)?.label}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  comment.status === 'open' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {comment.status === 'open' ? 'Abierto' : 'Resuelto'}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-3">{comment.content}</p>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{comment.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{comment.time}</span>
                </div>
                <span>Por: {comment.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingComment(comment)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteComment(comment.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {comment.tags && comment.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {comment.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Conductores y Comentarios</h2>
            <p className="text-sm text-gray-500 mt-1">Gestión de personal y registro de observaciones</p>
          </div>
        </div>
      </div>

      {/* Navegación de tabs */}
      <div className="bg-white border-b">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('drivers')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              activeTab === 'drivers'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Conductores
          </button>
          <button
            onClick={() => setActiveTab('comments')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              activeTab === 'comments'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Comentarios
          </button>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="bg-white p-6 rounded-lg shadow">
        {activeTab === 'drivers' ? <DriversSection /> : <CommentsSection />}
      </div>

      {/* Modal para conductor */}
      {showDriverForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-96 overflow-y-auto p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingDriver ? 'Editar Conductor' : 'Nuevo Conductor'}
            </h3>
            <form onSubmit={handleDriverSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={editingDriver ? editingDriver.dni : newDriver.dni}
                    onChange={(e) => editingDriver ? 
                      setEditingDriver({...editingDriver, dni: e.target.value}) :
                      setNewDriver({...newDriver, dni: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Licencia *</label>
                  <input
                    type="text"
                    required
                    value={editingDriver ? editingDriver.license : newDriver.license}
                    onChange={(e) => editingDriver ? 
                      setEditingDriver({...editingDriver, license: e.target.value}) :
                      setNewDriver({...newDriver, license: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vencimiento de Licencia</label>
                  <input
                    type="date"
                    value={editingDriver ? editingDriver.licenseExpiry : newDriver.licenseExpiry}
                    onChange={(e) => editingDriver ? 
                      setEditingDriver({...editingDriver, licenseExpiry: e.target.value}) :
                      setNewDriver({...newDriver, licenseExpiry: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    value={editingDriver ? editingDriver.phone : newDriver.phone}
                    onChange={(e) => editingDriver ? 
                      setEditingDriver({...editingDriver, phone: e.target.value}) :
                      setNewDriver({...newDriver, phone: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editingDriver ? editingDriver.email : newDriver.email}
                    onChange={(e) => editingDriver ? 
                      setEditingDriver({...editingDriver, email: e.target.value}) :
                      setNewDriver({...newDriver, email: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Turno</label>
                  <select
                    value={editingDriver ? editingDriver.shift : newDriver.shift}
                    onChange={(e) => editingDriver ? 
                      setEditingDriver({...editingDriver, shift: e.target.value}) :
                      setNewDriver({...newDriver, shift: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {shiftTypes.map(shift => (
                      <option key={shift.value} value={shift.value}>{shift.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select
                    value={editingDriver ? editingDriver.status : newDriver.status}
                    onChange={(e) => editingDriver ? 
                      setEditingDriver({...editingDriver, status: e.target.value}) :
                      setNewDriver({...newDriver, status: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {driverStatuses.map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <input
                  type="text"
                  value={editingDriver ? editingDriver.address : newDriver.address}
                  onChange={(e) => editingDriver ? 
                    setEditingDriver({...editingDriver, address: e.target.value}) :
                    setNewDriver({...newDriver, address: e.target.value})
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea
                  value={editingDriver ? editingDriver.notes : newDriver.notes}
                  onChange={(e) => editingDriver ? 
                    setEditingDriver({...editingDriver, notes: e.target.value}) :
                    setNewDriver({...newDriver, notes: e.target.value})
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowDriverForm(false);
                    setEditingDriver(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  {editingDriver ? 'Actualizar' : 'Crear'} Conductor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para comentario */}
      {showCommentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingComment ? 'Editar Comentario' : 'Nuevo Comentario'}
            </h3>
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
                  <select
                    required
                    value={editingComment ? editingComment.type : newComment.type}
                    onChange={(e) => editingComment ? 
                      setEditingComment({...editingComment, type: e.target.value}) :
                      setNewComment({...newComment, type: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {commentTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entidad *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nombre del vehículo, conductor, etc."
                    value={editingComment ? editingComment.entityName : newComment.entityName}
                    onChange={(e) => editingComment ? 
                      setEditingComment({...editingComment, entityName: e.target.value}) :
                      setNewComment({...newComment, entityName: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                  <select
                    value={editingComment ? editingComment.priority : newComment.priority}
                    onChange={(e) => editingComment ? 
                      setEditingComment({...editingComment, priority: e.target.value}) :
                      setNewComment({...newComment, priority: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {priorityLevels.map(priority => (
                      <option key={priority.value} value={priority.value}>{priority.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select
                    value={editingComment ? editingComment.category : newComment.category}
                    onChange={(e) => editingComment ? 
                      setEditingComment({...editingComment, category: e.target.value}) :
                      setNewComment({...newComment, category: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {commentCategories.map(category => (
                      <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                <input
                  type="text"
                  required
                  value={editingComment ? editingComment.title : newComment.title}
                  onChange={(e) => editingComment ? 
                    setEditingComment({...editingComment, title: e.target.value}) :
                    setNewComment({...newComment, title: e.target.value})
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenido *</label>
                <textarea
                  required
                  value={editingComment ? editingComment.content : newComment.content}
                  onChange={(e) => editingComment ? 
                    setEditingComment({...editingComment, content: e.target.value}) :
                    setNewComment({...newComment, content: e.target.value})
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCommentForm(false);
                    setEditingComment(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  {editingComment ? 'Actualizar' : 'Crear'} Comentario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverCommentsManagement;