// src/pages/MainLayout.js
import React, { useState } from 'react';
import Header from '../components/common/Header';
import NavigationTabs from '../components/common/NavigationTabs';
import DashboardPage from './DashboardPage';
import MapPage from './MapPage';
import VehiclesPage from './VehiclesPage';
import RoutesPage from './RoutesPage';
import ReportsPage from './ReportsPage';
import AlertsPage from './AlertsPage';
import SettingsPage from './SettingsPage';
import AdminPage from './AdminPage';
import EventsConfigurationPage from './EventsConfigurationPage';
import VehicleDetailsModal from '../components/vehicles/VehicleDetailsModal';
import { 
  Navigation, 
  Bell, 
  XCircle, 
  Users, 
  Eye, 
  Wifi, 
  Battery, 
  ThermometerSun, 
  Fuel,
  BarChart3, 
  MapPin,
  Car,
  Route,
  FileText,
  Settings,
  Shield,
  Zap
} from 'lucide-react';

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [userRole, setUserRole] = useState('administrador'); // Simular rol del usuario

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'map', name: 'Mapa', icon: MapPin },
    { id: 'vehicles', name: 'Vehículos', icon: Car },
    { id: 'routes', name: 'Rutas', icon: Route },
    { id: 'reports', name: 'Reportes', icon: FileText },
    { id: 'events', name: 'Eventos', icon: Zap },
    { id: 'settings', name: 'Configuración', icon: Settings },
    // Solo mostrar el tab de administración si el usuario es administrador
    ...(userRole === 'administrador' ? [{ id: 'admin', name: 'Administración', icon: Shield }] : [])
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardPage setSelectedVehicle={setSelectedVehicle} />;
      case 'map': return <MapPage setSelectedVehicle={setSelectedVehicle} />;
      case 'vehicles': return <VehiclesPage setSelectedVehicle={setSelectedVehicle} />;
      case 'routes': return <RoutesPage />;
      case 'reports': return <ReportsPage />;
      case 'alerts': return <AlertsPage notifications={notifications} />;
      case 'events': return <EventsConfigurationPage />;
      case 'settings': return <SettingsPage />;
      case 'admin': return userRole === 'administrador' ? <AdminPage /> : <DashboardPage setSelectedVehicle={setSelectedVehicle} />;
      default: return <DashboardPage setSelectedVehicle={setSelectedVehicle} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header notifications={notifications} userRole={userRole} />
      <NavigationTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderActiveTab()}
      </main>

      {selectedVehicle && (
        <VehicleDetailsModal 
          vehicle={selectedVehicle} 
          onClose={() => setSelectedVehicle(null)} 
        />
      )}
    </div>
  );
};

export default MainLayout;