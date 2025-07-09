// src/hooks/useVehicles.js
import { useState, useEffect } from 'react';
import 
{ Bus, Car, Dog,  Truck, Bike, CheckCircle, XCircle, Activity, AlertTriangle,  Wifi} from 'lucide-react';
import { FaMotorcycle } from 'react-icons/fa';

const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  
  const vehicleTypes = [
    { type: 'bus', icon: Car, color: 'blue', name: 'Camioneta de Serenazgo' },
    { type: 'taxi', icon: FaMotorcycle, color: 'yellow', name: 'Moto de Serenazgo' },
    { type: 'truck', icon: Dog, color: 'green', name: 'Perro Policía' }
  ];

  const status = ['En ruta', 'Detenido', 'Mantenimiento', 'Emergencia', 'Offline'];
  const drivers = [
    'Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez', 'Luis Rodríguez', 
    'Sofia Mendoza', 'Pedro Castillo', 'Carmen Silva', 'Diego Morales', 'Lucia Torres'
  ];

  const routes = [
    'Lima Centro - Callao', 'Miraflores - San Isidro', 'La Victoria - Ate',
    'Surco - Chorrillos', 'Los Olivos - Comas', 'San Juan - Villa El Salvador',
    'Breña - Pueblo Libre', 'Magdalena - San Miguel', 'Jesús María - Lince'
  ];

  // Inicializar vehículos
  useEffect(() => {
    const initialVehicles = [];

    for (let i = 1; i <= 30; i++) {
      const vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
      const randomStatus = status[Math.floor(Math.random() * status.length)];
      const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
      const randomRoute = routes[Math.floor(Math.random() * routes.length)];
      
      const vehicle = {
        id: i,
        plate: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 900) + 100}`,
        type: vehicleType.type,
        icon: vehicleType.icon,
        color: vehicleType.color,
        name: vehicleType.name,
        driver: randomDriver,
        status: randomStatus,
        speed: randomStatus === 'En ruta' ? Math.floor(Math.random() * 60) + 10 : 0,
        fuel: Math.floor(Math.random() * 100),
        lat: -12.0464 + (Math.random() - 0.5) * 0.4,
        lng: -77.0428 + (Math.random() - 0.5) * 0.4,
        lastUpdate: new Date().toLocaleTimeString(),
        route: randomRoute,
        direction: Math.random() * 360,
        odometer: Math.floor(Math.random() * 50000) + 10000,
        temperature: Math.floor(Math.random() * 40) + 15,
        battery: Math.floor(Math.random() * 100),
        signal: Math.floor(Math.random() * 100),
        maxSpeed: Math.floor(Math.random() * 30) + 40,
        distance: Math.floor(Math.random() * 200) + 50
      };

      initialVehicles.push(vehicle);
    }

    setVehicles(initialVehicles);
  }, []);

  // Simular movimiento de vehículos
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prev => prev.map(vehicle => {
        if (vehicle.status === 'En ruta') {
          const speed = 0.0001;
          const direction = vehicle.direction + (Math.random() - 0.5) * 20;
          const radians = direction * Math.PI / 180;
          
          return {
            ...vehicle,
            lat: vehicle.lat + Math.cos(radians) * speed,
            lng: vehicle.lng + Math.sin(radians) * speed,
            direction: direction,
            speed: Math.floor(Math.random() * 60) + 10,
            lastUpdate: new Date().toLocaleTimeString(),
            distance: vehicle.distance + Math.random() * 2
          };
        }
        return vehicle;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'En ruta': return 'text-green-600 bg-green-100';
      case 'Detenido': return 'text-red-600 bg-red-100';
      case 'Mantenimiento': return 'text-yellow-600 bg-yellow-100';
      case 'Emergencia': return 'text-red-800 bg-red-200';
      case 'Offline': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'En ruta': return <CheckCircle className="w-4 h-4" />;
      case 'Detenido': return <XCircle className="w-4 h-4" />;
      case 'Mantenimiento': return <Activity className="w-4 h-4" />;
      case 'Emergencia': return <AlertTriangle className="w-4 h-4" />;
      case 'Offline': return <Wifi className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return { vehicles, setVehicles, getStatusColor, getStatusIcon };
};

export default useVehicles;