// src/hooks/useReports.js
import { useState, useEffect } from 'react';
const useReports = () => {
  const [reports, setReports] = useState([]);

  // Generar reportes simulados
  useEffect(() => {
    const initialReports = [];
    
    for (let i = 1; i <= 10; i++) {
      initialReports.push({
        id: i,
        name: `Reporte ${i === 1 ? 'Diario' : i === 2 ? 'Semanal' : i === 3 ? 'Mensual' : 'Personalizado'} - ${new Date().toLocaleDateString()}`,
        type: i <= 3 ? 'Automático' : 'Manual',
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
        status: Math.random() > 0.3 ? 'Completado' : 'Pendiente',
        vehicles: Math.floor(Math.random() * 30) + 1
      });
    }

    setReports(initialReports);
  }, []);

  return { reports, setReports };
};

export default useReports;