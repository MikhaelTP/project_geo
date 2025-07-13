// src/pages/EventsConfigurationPage.js
import React, { useState } from 'react';
import { Settings, MapPin, MessageSquare, User, Wrench, Car, Shield } from 'lucide-react';
import GeofencesManagement from '../components/events/GeofencesManagement';
import PointsOfInterest from '../components/events/PointsOfInterest';
import MaintenanceManagement from '../components/maintenance/MaintenanceManagement';
import DriverCommentsManagement from '../components/management/DriverCommentsManagement';

const EventsConfigurationPage = () => {
  const [activeTab, setActiveTab] = useState('geofences');

  const tabs = [
    { 
      id: 'geofences', 
      name: 'Geo Cercas', 
      icon: Shield,
      description: 'Crear y gestionar zonas geográficas'
    },
    { 
      id: 'points', 
      name: 'Puntos de Interés', 
      icon: MapPin,
      description: 'Gestionar ubicaciones importantes'
    },
    { 
      id: 'maintenance', 
      name: 'Mantenimiento', 
      icon: Wrench,
      description: 'Odómetro y mantenimiento de vehículos'
    },
    { 
      id: 'drivers', 
      name: 'Conductores', 
      icon: User,
      description: 'Gestión de conductores y comentarios'
    }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'geofences':
        return <GeofencesManagement />;
      case 'points':
        return <PointsOfInterest />;
      case 'maintenance':
        return <MaintenanceManagement />;
      case 'drivers':
        return <DriverCommentsManagement />;
      default:
        return <GeofencesManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Configuración de Eventos</h1>
                <p className="text-sm text-gray-500">Gestión completa de eventos y configuraciones del sistema</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Módulo Avanzado</p>
                <p className="text-sm text-gray-500">Distrito de Miraflores</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación de tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <div className="text-left">
                    <div>{tab.name}</div>
                    <div className="text-xs text-gray-400">{tab.description}</div>
                  </div>
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

export default EventsConfigurationPage;