import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const updateNotifications = useCallback((newNotifications) => {
    setNotifications(newNotifications);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, updateNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};