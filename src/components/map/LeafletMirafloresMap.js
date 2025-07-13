// src/components/map/LeafletMirafloresMap.js
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Car, MapPin, Navigation, Plus, Minus, RotateCcw } from 'lucide-react';
import { FaMotorcycle } from 'react-icons/fa';

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LeafletMirafloresMap = ({ vehicles, selectedVehicle, onVehicleSelect, showAlerts }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  // Coordenadas del centro de Miraflores
  const MIRAFLORES_CENTER = [-12.1215, -77.0285];

  useEffect(() => {
    // Inicializar el mapa
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: MIRAFLORES_CENTER,
        zoom: 15,
        zoomControl: false // Deshabilitamos los controles por defecto
      });

      // Agregar capa de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(mapInstanceRef.current);

      // Agregar algunos puntos de interés de Miraflores
      const pointsOfInterest = [
        { 
          coords: [-12.1201, -77.0282], 
          name: 'Municipalidad de Miraflores',
          popup: 'Sede municipal'
        },
        { 
          coords: [-12.1210, -77.0295], 
          name: 'Parque Kennedy',
          popup: 'Parque central de Miraflores'
        },
        { 
          coords: [-12.1320, -77.0420], 
          name: 'Larcomar',
          popup: 'Centro comercial'
        },
        { 
          coords: [-12.1180, -77.0350], 
          name: 'Malecón de Miraflores',
          popup: 'Zona turística'
        }
      ];

      // Agregar marcadores de puntos de interés
      pointsOfInterest.forEach(poi => {
        const poiIcon = L.divIcon({
          className: 'custom-poi-marker',
          html: `<div style="
            background-color: #DC2626;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          ">
            <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        L.marker(poi.coords, { icon: poiIcon })
          .bindPopup(`<strong>${poi.name}</strong><br>${poi.popup}`)
          .addTo(mapInstanceRef.current);
      });
    }

    return () => {
      // Cleanup al desmontar
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Actualizar marcadores de vehículos
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Limpiar marcadores existentes
    Object.values(markersRef.current).forEach(marker => {
      mapInstanceRef.current.removeLayer(marker);
    });
    markersRef.current = {};

    // Agregar nuevos marcadores de vehículos
    vehicles.forEach(vehicle => {
      const isSelected = selectedVehicle?.id === vehicle.id;
      
      // Crear icono personalizado para cada vehículo
      const vehicleIcon = L.divIcon({
        className: 'custom-vehicle-marker',
        html: `<div style="
          background-color: ${vehicle.color};
          width: ${isSelected ? '32px' : '24px'};
          height: ${isSelected ? '32px' : '24px'};
          border-radius: 50%;
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          position: relative;
          transition: all 0.3s ease;
          transform: rotate(${vehicle.direction || 0}deg);
        ">
          ${getVehicleIconSVG(vehicle.type)}
          ${vehicle.status === 'En ruta' ? `
            <div style="
              position: absolute;
              top: -2px;
              right: -2px;
              width: 8px;
              height: 8px;
              background-color: #10B981;
              border: 1px solid white;
              border-radius: 50%;
              animation: pulse 2s infinite;
            "></div>
          ` : ''}
          ${showAlerts && vehicle.status === 'Emergencia' ? `
            <div style="
              position: absolute;
              top: -4px;
              left: -4px;
              width: 12px;
              height: 12px;
              background-color: #EF4444;
              border-radius: 50%;
              animation: ping 1s infinite;
            "></div>
          ` : ''}
        </div>`,
        iconSize: [isSelected ? 32 : 24, isSelected ? 32 : 24],
        iconAnchor: [isSelected ? 16 : 12, isSelected ? 16 : 12]
      });

      const marker = L.marker([vehicle.lat, vehicle.lng], { 
        icon: vehicleIcon,
        zIndexOffset: isSelected ? 1000 : 0
      });

      // Popup con información del vehículo
      const popupContent = `
        <div style="font-family: sans-serif; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; color: ${vehicle.color}; font-size: 16px; font-weight: bold;">
            ${vehicle.plate}
          </h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
            <div><strong>Conductor:</strong></div>
            <div>${vehicle.driver}</div>
            <div><strong>Estado:</strong></div>
            <div style="color: ${getStatusColor(vehicle.status)}; font-weight: bold;">${vehicle.status}</div>
            <div><strong>Velocidad:</strong></div>
            <div>${vehicle.speed} km/h</div>
            <div><strong>Combustible:</strong></div>
            <div>${vehicle.fuel}%</div>
            <div><strong>Ruta:</strong></div>
            <div>${vehicle.route}</div>
          </div>
          <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #e5e5e5; font-size: 11px; color: #666;">
            Última actualización: ${vehicle.lastUpdate || new Date().toLocaleTimeString()}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      // Event handler para selección
      marker.on('click', () => {
        onVehicleSelect(vehicle);
      });

      markersRef.current[vehicle.id] = marker;
      marker.addTo(mapInstanceRef.current);
    });
  }, [vehicles, selectedVehicle, onVehicleSelect, showAlerts]);

  // Centrar mapa en vehículo seleccionado
  useEffect(() => {
    if (selectedVehicle && mapInstanceRef.current) {
      mapInstanceRef.current.setView([selectedVehicle.lat, selectedVehicle.lng], 17, {
        animate: true,
        duration: 1
      });
      
      // Abrir popup del vehículo seleccionado
      const marker = markersRef.current[selectedVehicle.id];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedVehicle]);

  // Funciones auxiliares
  const getVehicleIconSVG = (type) => {
    switch (type) {
      case 'bus':
        return `<svg width="16" height="16" fill="white" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>`;
      case 'taxi':
        return `<svg width="14" height="14" fill="white" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>`;
      default:
        return `<svg width="14" height="14" fill="white" viewBox="0 0 24 24">
          <path d="M19 7h-3V6a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6h4v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
        </svg>`;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'En ruta': return '#10B981';
      case 'Detenido': return '#EF4444';
      case 'Mantenimiento': return '#F59E0B';
      case 'Emergencia': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(MIRAFLORES_CENTER, 15);
    }
  };

  return (
    <div className="relative w-full h-[800px] rounded-lg overflow-hidden border border-gray-300 shadow-lg">
      {/* Contenedor del mapa */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Controles personalizados */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-[1000]">
        <button 
          onClick={handleRecenter}
          className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors border"
          title="Centrar en Miraflores"
        >
          <RotateCcw className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={handleZoomIn}
          className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors border"
          title="Acercar"
        >
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors border"
          title="Alejar"
        >
          <Minus className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Panel de información */}
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg z-[1000] border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Miraflores, Lima</p>
            <p className="text-xs text-gray-500">Mapa en tiempo real</p>
            <p className="text-xs text-gray-500">{vehicles.length} unidades activas</p>
            <div className="flex items-center space-x-1 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium">OpenStreetMap</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leyenda */}
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-xs z-[1000] border">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Leyenda</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Camioneta Serenazgo</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Moto Serenazgo</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Unidad Canina</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">En movimiento</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-600 rounded-full"></div>
            <span className="text-xs text-gray-600">Puntos de interés</span>
          </div>
        </div>
      </div>

      {/* Estilos CSS para animaciones */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .custom-vehicle-marker {
          background: transparent !important;
          border: none !important;
        }
        .custom-poi-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
};

export default LeafletMirafloresMap;