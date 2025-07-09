// src/components/alerts/AlertCards.js
import React from 'react';
import { AlertTriangle, Activity, Bell } from 'lucide-react';

const AlertCards = ({ notifications }) => {
  return (
    <>
      {notifications.map(notification => (
        <div key={notification.id} className={`bg-white rounded-lg shadow p-4 border-l-4 ${
          notification.type === 'error' ? 'border-red-500' :
          notification.type === 'warning' ? 'border-yellow-500' :
          'border-blue-500'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${
                notification.type === 'error' ? 'bg-red-100' :
                notification.type === 'warning' ? 'bg-yellow-100' :
                'bg-blue-100'
              }`}>
                {notification.type === 'error' ? 
                  <AlertTriangle className={`w-5 h-5 text-red-600`} /> :
                  notification.type === 'warning' ?
                  <Activity className={`w-5 h-5 text-yellow-600`} /> :
                  <Bell className={`w-5 h-5 text-blue-600`} />
                }
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
              </div>
            </div>
            {!notification.read && (
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default AlertCards;