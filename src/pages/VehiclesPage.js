// src/pages/VehiclesPage.js
import React, { useState } from 'react';
import useVehicles from '../hooks/useVehicles';
import VehicleFilters from '../components/vehicles/VehicleFilters';
import VehiclesTable from '../components/vehicles/VehiclesTable';

const VehiclesPage = ({ setSelectedVehicle }) => {
  const { vehicles } = useVehicles();
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesFilter = filterStatus === 'all' || vehicle.status === filterStatus;
    const matchesSearch = vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.route.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <VehicleFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      <VehiclesTable 
        vehicles={filteredVehicles} 
        onSelectVehicle={setSelectedVehicle} 
      />
    </div>
  );
};

export default VehiclesPage;