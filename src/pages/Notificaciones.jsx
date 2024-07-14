import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNotificationContext } from '../context/NotificationContext';

const Notificaciones = () => {
  const { notifications, updateNotifications } = useNotificationContext();
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const [userData, setUserData] = useState({
    area: ''
  });
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        const response = await axios.get(`https://symbolic-truth-426104-r0.wl.r.appspot.com/api/user/user/${user.email}`, config);
        const userData = response.data.user;
        setUserData({
          area: userData.area,
        });
      } catch (error) {
        console.error('Error al cargar los datos del usuario', error);
      }
    };
  
    fetchUserData();
  }, [user.email, user.token]);


  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        const response = await axios.get('https://symbolic-truth-426104-r0.wl.r.appspot.com/api/user/notifications', config);
        updateNotifications(response.data.notifications);
      } catch (error) {
        console.error('Error al cargar las notificaciones', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotificaciones();
  }, [user.token, updateNotifications]);

  const handleDeleteNotification = async (index) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.delete(`https://symbolic-truth-426104-r0.wl.r.appspot.com/api/user/notifications/${index}`, config);
      updateNotifications(notifications.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error al eliminar la notificación', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-8 w-full">
      <h1 className="text-2xl font-bold mb-4">Notificaciones</h1>
      <div className="mb-6"></div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Publicaciones del DOF</h2>
        {notifications.map((notificacion, index) => (
          <div
            key={index}
            className="relative p-4 rounded-lg shadow bg-white"
          >
            
            <button
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              onClick={() => handleDeleteNotification(index)}
            >
              <FaTimes size={20} />
            </button>
            <div className="text-lg text-black whitespace-pre-line text-justify">
              Area: {userData.area}{"\n"}
              {notificacion}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notificaciones;
