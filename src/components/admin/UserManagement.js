// src/components/admin/UserManagement.js
import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, Shield, Eye, UserCheck } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  // Simulación de datos de usuarios
  useEffect(() => {
    const initialUsers = [
      {
        id: 1,
        username: 'admin_sistema',
        email: 'admin@miraflores.gob.pe',
        fullName: 'Carlos Mendoza',
        role: 'administrador',
        status: 'activo',
        createdAt: '2024-01-15',
        lastLogin: '2024-07-09 10:30:00',
        permissions: ['full_access', 'user_management', 'system_config']
      },
      {
        id: 2,
        username: 'supervisor_serenazgo',
        email: 'supervisor@miraflores.gob.pe',
        fullName: 'María García',
        role: 'administrador_grupo',
        status: 'activo',
        createdAt: '2024-02-20',
        lastLogin: '2024-07-09 08:45:00',
        permissions: ['vehicle_management', 'route_management', 'reports']
      },
      {
        id: 3,
        username: 'operador_turno1',
        email: 'operador1@miraflores.gob.pe',
        fullName: 'Luis Rodríguez',
        role: 'visitante',
        status: 'activo',
        createdAt: '2024-03-10',
        lastLogin: '2024-07-09 09:15:00',
        permissions: ['view_only', 'basic_reports']
      },
      {
        id: 4,
        username: 'operador_turno2',
        email: 'operador2@miraflores.gob.pe',
        fullName: 'Ana Martínez',
        role: 'visitante',
        status: 'inactivo',
        createdAt: '2024-04-05',
        lastLogin: '2024-07-08 16:20:00',
        permissions: ['view_only']
      }
    ];
    setUsers(initialUsers);
  }, []);

  const userTypes = [
    { 
      value: 'administrador', 
      label: 'Administrador Sistema',
      icon: Shield,
      color: 'text-red-600 bg-red-100',
      description: 'Acceso completo al sistema'
    },
    { 
      value: 'administrador_grupo', 
      label: 'Administrador de Grupo',
      icon: UserCheck,
      color: 'text-blue-600 bg-blue-100',
      description: 'Gestión de vehículos y rutas'
    },
    { 
      value: 'visitante', 
      label: 'Visitante (Solo Lectura)',
      icon: Eye,
      color: 'text-gray-600 bg-gray-100',
      description: 'Solo visualización de datos'
    }
  ];

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    fullName: '',
    role: 'visitante',
    password: '',
    confirmPassword: ''
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    const userType = userTypes.find(type => type.value === newUser.role);
    const user = {
      id: Date.now(),
      ...newUser,
      status: 'activo',
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: 'Nunca',
      permissions: getPermissionsByRole(newUser.role)
    };
    
    setUsers([...users, user]);
    setNewUser({
      username: '',
      email: '',
      fullName: '',
      role: 'visitante',
      password: '',
      confirmPassword: ''
    });
    setShowCreateForm(false);
  };

  const getPermissionsByRole = (role) => {
    switch (role) {
      case 'administrador':
        return ['full_access', 'user_management', 'system_config', 'vehicle_management', 'route_management', 'reports'];
      case 'administrador_grupo':
        return ['vehicle_management', 'route_management', 'reports', 'alerts_management'];
      case 'visitante':
        return ['view_only', 'basic_reports'];
      default:
        return ['view_only'];
    }
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'activo' ? 'inactivo' : 'activo' }
        : user
    ));
  };

  const deleteUser = (userId) => {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const getRoleConfig = (role) => {
    return userTypes.find(type => type.value === role) || userTypes[2];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Gestión de Usuarios</h2>
            <p className="text-sm text-gray-500 mt-1">Administrar cuentas y permisos del sistema</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Usuario</span>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por nombre, usuario o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="all">Todos los roles</option>
            {userTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>
        {userTypes.map(type => {
          const count = users.filter(user => user.role === type.value).length;
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

      {/* Tabla de usuarios */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Acceso</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map(user => {
              const roleConfig = getRoleConfig(user.role);
              const RoleIcon = roleConfig.icon;
              
              return (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                        <div className="text-sm text-gray-500">{user.username}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleConfig.color}`}>
                      <RoleIcon className="w-4 h-4 mr-1" />
                      {roleConfig.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setEditingUser(user)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`mr-3 ${user.status === 'activo' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                    >
                      {user.status === 'activo' ? 'Desactivar' : 'Activar'}
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
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

      {/* Modal para crear usuario */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Crear Nuevo Usuario</h3>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={newUser.fullName}
                  onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                <input
                  type="text"
                  required
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {userTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  required
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
                <input
                  type="password"
                  required
                  value={newUser.confirmPassword}
                  onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
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
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;