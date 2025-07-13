// src/components/maintenance/MaintenanceManagement.js
import React, { useState } from 'react';
import { Wrench, Plus, Edit, Calendar, AlertTriangle, CheckCircle, Clock, Fuel } from 'lucide-react';

const MaintenanceManagement = () => {
  const [activeTab, setActiveTab] = useState('odometer');
  const [vehicles] = useState([
    { id: 1, plate: 'ABC-123', name: 'Camioneta Serenazgo', currentOdometer: 45230 },
    { id: 2, plate: 'XYZ-456', name: 'Moto Serenazgo', currentOdometer: 23150 },
    { id: 3, plate: 'K9-789', name: 'Unidad Canina', currentOdometer: 12800 }
  ]);

  const [odometerRecords, setOdometerRecords] = useState([
    {
      id: 1,
      vehicleId: 1,
      plate: 'ABC-123',
      previousReading: 45180,
      currentReading: 45230,
      difference: 50,
      date: '2024-07-09',
      time: '10:30:00',
      recordedBy: 'Juan Pérez',
      notes: 'Lectura diaria de rutina'
    },
    {
      id: 2,
      vehicleId: 2,
      plate: 'XYZ-456',
      previousReading: 23120,
      currentReading: 23150,
      difference: 30,
      date: '2024-07-09',
      time: '09:15:00',
      recordedBy: 'María García',
      notes: 'Recorrido de patrullaje matutino'
    },
    {
      id: 3,
      vehicleId: 3,
      plate: 'K9-789',
      previousReading: 12750,
      currentReading: 12800,
      difference: 50,
      date: '2024-07-08',
      time: '16:45:00',
      recordedBy: 'Carlos López',
      notes: 'Operativo especial'
    }
  ]);

  const [maintenanceRecords, setMaintenanceRecords] = useState([
    {
      id: 1,
      vehicleId: 1,
      plate: 'ABC-123',
      type: 'oil_change',
      description: 'Cambio de aceite de motor',
      date: '2024-06-15',
      odometer: 44500,
      nextServiceOdometer: 49500,
      nextServiceDate: '2024-09-15',
      cost: 150.00,
      workshop: 'Taller Central',
      technician: 'Roberto Sánchez',
      status: 'completed',
      notes: 'Cambio de aceite 20W-50 y filtro'
    },
    {
      id: 2,
      vehicleId: 2,
      plate: 'XYZ-456',
      type: 'tire_change',
      description: 'Cambio de neumáticos',
      date: '2024-07-01',
      odometer: 22800,
      nextServiceOdometer: 27800,
      nextServiceDate: '2024-10-01',
      cost: 280.00,
      workshop: 'Llantas Express',
      technician: 'Ana Morales',
      status: 'completed',
      notes: 'Cambio de neumáticos delanteros'
    },
    {
      id: 3,
      vehicleId: 1,
      plate: 'ABC-123',
      type: 'brake_service',
      description: 'Mantenimiento de frenos',
      date: '2024-07-20',
      odometer: 45500,
      nextServiceOdometer: 50500,
      nextServiceDate: '2024-10-20',
      cost: 0,
      workshop: 'Programado',
      technician: 'Por asignar',
      status: 'scheduled',
      notes: 'Revisión programada del sistema de frenos'
    }
  ]);

  const [showOdometerForm, setShowOdometerForm] = useState(false);
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);

  const [newOdometerRecord, setNewOdometerRecord] = useState({
    vehicleId: '',
    currentReading: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0],
    recordedBy: 'Usuario Actual',
    notes: ''
  });

  const [newMaintenanceRecord, setNewMaintenanceRecord] = useState({
    vehicleId: '',
    type: 'oil_change',
    description: '',
    date: new Date().toISOString().split('T')[0],
    odometer: '',
    nextServiceOdometer: '',
    nextServiceDate: '',
    cost: '',
    workshop: '',
    technician: '',
    status: 'scheduled',
    notes: ''
  });

  const maintenanceTypes = [
    { value: 'oil_change', label: 'Cambio de Aceite', icon: Fuel },
    { value: 'tire_change', label: 'Cambio de Neumáticos', icon: Wrench },
    { value: 'brake_service', label: 'Servicio de Frenos', icon: AlertTriangle },
    { value: 'engine_service', label: 'Servicio de Motor', icon: Wrench },
    { value: 'transmission', label: 'Transmisión', icon: Wrench },
    { value: 'electrical', label: 'Sistema Eléctrico', icon: Wrench },
    { value: 'general', label: 'Mantenimiento General', icon: Wrench }
  ];

  const handleOdometerSubmit = (e) => {
    e.preventDefault();
    const vehicle = vehicles.find(v => v.id === parseInt(newOdometerRecord.vehicleId));
    const previousReading = odometerRecords
      .filter(r => r.vehicleId === parseInt(newOdometerRecord.vehicleId))
      .sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time))[0]?.currentReading || 0;

    const record = {
      id: Date.now(),
      ...newOdometerRecord,
      vehicleId: parseInt(newOdometerRecord.vehicleId),
      plate: vehicle.plate,
      previousReading: previousReading,
      currentReading: parseInt(newOdometerRecord.currentReading),
      difference: parseInt(newOdometerRecord.currentReading) - previousReading
    };

    setOdometerRecords([record, ...odometerRecords]);
    setNewOdometerRecord({
      vehicleId: '',
      currentReading: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0],
      recordedBy: 'Usuario Actual',
      notes: ''
    });
    setShowOdometerForm(false);
  };

  const handleMaintenanceSubmit = (e) => {
    e.preventDefault();
    const vehicle = vehicles.find(v => v.id === parseInt(newMaintenanceRecord.vehicleId));
    
    const record = {
      id: Date.now(),
      ...newMaintenanceRecord,
      vehicleId: parseInt(newMaintenanceRecord.vehicleId),
      plate: vehicle.plate,
      odometer: parseInt(newMaintenanceRecord.odometer),
      nextServiceOdometer: parseInt(newMaintenanceRecord.nextServiceOdometer),
      cost: parseFloat(newMaintenanceRecord.cost) || 0
    };

    setMaintenanceRecords([record, ...maintenanceRecords]);
    setNewMaintenanceRecord({
      vehicleId: '',
      type: 'oil_change',
      description: '',
      date: new Date().toISOString().split('T')[0],
      odometer: '',
      nextServiceOdometer: '',
      nextServiceDate: '',
      cost: '',
      workshop: '',
      technician: '',
      status: 'scheduled',
      notes: ''
    });
    setShowMaintenanceForm(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const OdometerSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Registro de Odómetro</h3>
        <button
          onClick={() => setShowOdometerForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Lectura</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lectura Anterior</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lectura Actual</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diferencia</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha/Hora</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registrado por</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {odometerRecords.map(record => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{record.plate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.previousReading.toLocaleString()} km
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.currentReading.toLocaleString()} km
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  +{record.difference} km
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.date} {record.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.recordedBy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const MaintenanceSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Mantenimiento de Vehículos</h3>
        <button
          onClick={() => setShowMaintenanceForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Mantenimiento</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Odómetro</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Próximo Servicio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costo</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {maintenanceRecords.map(record => {
              const typeConfig = maintenanceTypes.find(t => t.value === record.type);
              return (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.plate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {typeConfig && <typeConfig.icon className="w-4 h-4 mr-2 text-gray-500" />}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{typeConfig?.label}</div>
                        <div className="text-sm text-gray-500">{record.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.odometer.toLocaleString()} km
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.nextServiceOdometer.toLocaleString()} km</div>
                    <div className="text-sm text-gray-500">{record.nextServiceDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      <span className="ml-1">
                        {record.status === 'completed' ? 'Completado' : 
                         record.status === 'scheduled' ? 'Programado' : 
                         record.status === 'overdue' ? 'Vencido' : record.status}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    S/. {record.cost.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Gestión de Mantenimiento</h2>
            <p className="text-sm text-gray-500 mt-1">Control de odómetro y mantenimiento de vehículos</p>
          </div>
          <div className="flex items-center space-x-2">
            <Wrench className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500">Sistema de Mantenimiento</span>
          </div>
        </div>
      </div>

      {/* Navegación de tabs */}
      <div className="bg-white border-b">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('odometer')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              activeTab === 'odometer'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Registro de Odómetro
          </button>
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              activeTab === 'maintenance'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Mantenimiento
          </button>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="bg-white p-6 rounded-lg shadow">
        {activeTab === 'odometer' ? <OdometerSection /> : <MaintenanceSection />}
      </div>

      {/* Modal para registro de odómetro */}
      {showOdometerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nueva Lectura de Odómetro</h3>
            <form onSubmit={handleOdometerSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehículo *</label>
                <select
                  required
                  value={newOdometerRecord.vehicleId}
                  onChange={(e) => setNewOdometerRecord({...newOdometerRecord, vehicleId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seleccionar vehículo</option>
                  {vehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>{vehicle.plate} - {vehicle.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lectura Actual (km) *</label>
                <input
                  type="number"
                  required
                  value={newOdometerRecord.currentReading}
                  onChange={(e) => setNewOdometerRecord({...newOdometerRecord, currentReading: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
                  <input
                    type="date"
                    required
                    value={newOdometerRecord.date}
                    onChange={(e) => setNewOdometerRecord({...newOdometerRecord, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                    {maintenanceTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
                  <input
                    type="text"
                    required
                    value={newMaintenanceRecord.description}
                    onChange={(e) => setNewMaintenanceRecord({...newMaintenanceRecord, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
                  <input
                    type="date"
                    required
                    value={newMaintenanceRecord.date}
                    onChange={(e) => setNewMaintenanceRecord({...newMaintenanceRecord, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Odómetro (km) *</label>
                  <input
                    type="number"
                    required
                    value={newMaintenanceRecord.odometer}
                    onChange={(e) => setNewMaintenanceRecord({...newMaintenanceRecord, odometer: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Próximo Servicio (km)</label>
                  <input
                    type="number"
                    value={newMaintenanceRecord.nextServiceOdometer}
                    onChange={(e) => setNewMaintenanceRecord({...newMaintenanceRecord, nextServiceOdometer: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Próximo Servicio (fecha)</label>
                  <input
                    type="date"
                    value={newMaintenanceRecord.nextServiceDate}
                    onChange={(e) => setNewMaintenanceRecord({...newMaintenanceRecord, nextServiceDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Costo (S/.)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newMaintenanceRecord.cost}
                    onChange={(e) => setNewMaintenanceRecord({...newMaintenanceRecord, cost: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Taller</label>
                  <input
                    type="text"
                    value={newMaintenanceRecord.workshop}
                    onChange={(e) => setNewMaintenanceRecord({...newMaintenanceRecord, workshop: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Técnico</label>
                  <input
                    type="text"
                    value={newMaintenanceRecord.technician}
                    onChange={(e) => setNewMaintenanceRecord({...newMaintenanceRecord, technician: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select
                    value={newMaintenanceRecord.status}
                    onChange={(e) => setNewMaintenanceRecord({...newMaintenanceRecord, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="scheduled">Programado</option>
                    <option value="completed">Completado</option>
                    <option value="overdue">Vencido</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea
                  value={newMaintenanceRecord.notes}
                  onChange={(e) => setNewMaintenanceRecord({...newMaintenanceRecord, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowMaintenanceForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Registrar Mantenimiento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceManagement;