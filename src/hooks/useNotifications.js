// src/hooks/useNotifications.js
import { useState } from 'react';
import { AlertTriangle, Activity, Bell } from 'lucide-react';

const useNotifications = (vehicles) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const initialNotifications = [];
    
    vehicles.forEach(vehicle => {
      if (Math.random() > 0.7) {
        initialNotifications.push({
          id: Date.now() + vehicle.id,
          type: vehicle.status === 'Emergencia' ? 'error' : 
                vehicle.status === 'Mantenimiento' ? 'warning' : 'info',
          title: `Vehículo ${vehicle.plate}`,
          message: vehicle.status === 'Emergencia' ? 'Botón de pánico activado' : 
                  vehicle.status === 'Mantenimiento' ? 'Requiere mantenimiento programado' :
                  'Velocidad excedida detectada',
          time: new Date().toLocaleTimeString(),
          read: false
        });
      }
    });

    setNotifications(initialNotifications);
  }, [vehicles]);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return { notifications, setNotifications, markAsRead };
};

export default useNotifications;