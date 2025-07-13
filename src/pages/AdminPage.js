// src/pages/AdminPage.js
import React, { useState } from 'react';
import { Shield, Users, Car, Settings, Database, Activity } from 'lucide-react';
import UserManagement from '../components/admin/UserManagement';
import VehicleManagement from '../components/admin/VehicleManagement';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('users');

  const adminTabs = [
    { 
      id: 'users', 
      name: 'Gestión de Usuarios', 
      icon: Users,
      description: 'Administrar cuentas y permisos'
    },
    { 
      id: 'vehicles', 
      name: 'Gestión de Vehículos', 
      icon: Car,
      description: 'Modificar datos de unidades'
    },
    { 
      id: 'system', 
      name: 'Configuración del Sistema', 
      icon: Settings,
      description: 'Ajustes generales'
    },
    { 
      id: 'database', 
      name: 'Base de Datos', 
      icon: Database,
      description: 'Respaldos y mantenimiento'
    },
    { 
      id: 'logs', 
      name: 'Logs del Sistema', 
      icon: Activity,
      description: 'Auditoría y monitoreo'
    }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'vehicles':
        return <VehicleManagement />;
      case 'system':
        return <SystemConfiguration />;
      case 'database':
        return <DatabaseManagement />;
      case 'logs':
        return <SystemLogs />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de Administración */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-sm text-gray-500">Sistema de Gestión Municipal - Miraflores</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Administrador del Sistema</p>
                <p className="text-sm text-gray-500">Acceso total habilitado</p>
              </div>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación de tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {adminTabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderActiveTab()}
      </main>
    </div>
  );
};

// Componente placeholder para Configuración del Sistema
const SystemConfiguration = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración del Sistema</h3>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Configuración General</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre del Sistema</label>
              <input 
                type="text" 
                defaultValue="GPS Tracker Pro - Miraflores"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Zona Horaria</label>
              <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>América/Lima (UTC-5)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Idioma</label>
              <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Español</option>
                <option>Inglés</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Configuración de Mapa</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Proveedor de Mapas</label>
              <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Google Maps</option>
                <option>OpenStreetMap</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Zoom Inicial</label>
              <input 
                type="number" 
                defaultValue="13"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Centro del Mapa</label>
              <input 
                type="text" 
                defaultValue="Miraflores, Lima"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Guardar Configuración
        </button>
      </div>
    </div>
  </div>
);

// Componente placeholder para Gestión de Base de Datos
const DatabaseManagement = () => (
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Gestión de Base de Datos</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Respaldo de Datos</h4>
          <p className="text-sm text-gray-600 mb-3">Crear respaldo completo del sistema</p>
          <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Crear Respaldo
          </button>
        </div>
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Restaurar Datos</h4>
          <p className="text-sm text-gray-600 mb-3">Restaurar desde respaldo anterior</p>
          <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
            Restaurar
          </button>
        </div>
        <div className="p-4 border rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Mantenimiento</h4>
          <p className="text-sm text-gray-600 mb-3">Optimizar base de datos</p>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Optimizar
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Componente placeholder para Logs del Sistema
const SystemLogs = () => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Logs del Sistema</h3>
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-md">
            <option>Todos los eventos</option>
            <option>Errores</option>
            <option>Advertencias</option>
            <option>Información</option>
          </select>
          <input 
            type="date" 
            className="px-3 py-2 border border-gray-300 rounded-md"
            defaultValue={new Date().toISOString().split('T')[0]}
          />
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Exportar Logs
        </button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="space-y-2 font-mono text-sm">
          <div className="text-green-600">[2024-07-09 10:30:15] INFO: Usuario admin_sistema inició sesión</div>
          <div className="text-blue-600">[2024-07-09 10:28:42] INFO: Vehículo ABC-123 actualizado por supervisor_serenazgo</div>
          <div className="text-yellow-600">[2024-07-09 10:25:33] WARN: Batería baja detectada en vehículo XYZ-456</div>
          <div className="text-red-600">[2024-07-09 10:20:18] ERROR: Fallo en conexión GPS para vehículo K9-789</div>
          <div className="text-blue-600">[2024-07-09 10:18:05] INFO: Nuevo usuario operador_turno3 creado</div>
          <div className="text-green-600">[2024-07-09 10:15:22] INFO: Respaldo de base de datos completado</div>
          <div className="text-yellow-600">[2024-07-09 10:12:11] WARN: Velocidad excedida detectada en vehículo ABC-123</div>
          <div className="text-blue-600">[2024-07-09 10:08:44] INFO: Configuración del sistema actualizada</div>
          <div className="text-green-600">[2024-07-09 10:05:33] INFO: Sistema iniciado correctamente</div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminPage;