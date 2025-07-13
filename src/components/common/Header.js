// src/components/common/Header.js
import React from 'react';
import { Navigation, Bell, Shield, UserCheck, Eye, ChevronDown } from 'lucide-react';

const Header = ({ notifications, userRole = 'visitante' }) => {
  const getRoleConfig = (role) => {
    switch (role) {
      case 'administrador':
        return {
          label: 'Administrador Sistema',
          icon: Shield,
          color: 'text-red-600',
          bgColor: 'bg-red-100'
        };
      case 'administrador_grupo':
        return {
          label: 'Administrador de Grupo',
          icon: UserCheck,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100'
        };
      case 'visitante':
        return {
          label: 'Visitante (Solo Lectura)',
          icon: Eye,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100'
        };
      default:
        return {
          label: 'Usuario',
          icon: Eye,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100'
        };
    }
  };

  const roleConfig = getRoleConfig(userRole);
  const RoleIcon = roleConfig.icon;

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">GPS Tracker Pro</h1>
              <p className="text-sm text-gray-500">Sistema de Rastreadores - Lima, Perú</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notificaciones */}
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer" />
              {notifications.filter(n => !n.read).length > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">
                    {notifications.filter(n => !n.read).length}
                  </span>
                </div>
              )}
            </div>

            {/* Información del usuario */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Carlos Mendoza</p>
                <div className="flex items-center space-x-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${roleConfig.bgColor} ${roleConfig.color}`}>
                    <RoleIcon className="w-3 h-3 mr-1" />
                    {roleConfig.label}
                  </span>
                </div>
              </div>
              
              {/* Avatar y dropdown */}
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">CM</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Estado del sistema */}
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Sistema Online</p>
                <p className="text-sm text-gray-500">{new Date().toLocaleTimeString()}</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;