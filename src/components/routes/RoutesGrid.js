// src/components/routes/RoutesGrid.js
import React from 'react';
import RouteCard from './RouteCard';

const RoutesGrid = () => {
  const routes = [
    'Lima Centro - Callao', 'Miraflores - San Isidro', 'La Victoria - Ate',
    'Surco - Chorrillos', 'Los Olivos - Comas', 'San Juan - Villa El Salvador',
    'Breña - Pueblo Libre', 'Magdalena - San Miguel', 'Jesús María - Lince'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {routes.map((route, index) => (
        <RouteCard key={index} route={route} index={index} />
      ))}
    </div>
  );
};

export default RoutesGrid;