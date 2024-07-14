import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTheme, lightTheme } from '../components/ThemeProvider';
import { useNotificationContext } from '../context/NotificationContext';


const RevisarNotificaciones = () => {
  const [userData, setUserData] = useState({
    id: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    edad: '',
    email: '',
    area: '',
    photo: ''
  });
  const { notifications, updateNotifications } = useNotificationContext();
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const { theme } = useTheme();
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        const response = await axios.get(`https://symbolic-truth-426104-r0.wl.r.appspot.com/api/user/user/${user.email}`, config);
        const userData = response.data.user;
        setUserData({
          id: userData._id,
          nombre: userData.nombre,
          apellidoPaterno: userData.apellidoPaterno,
          apellidoMaterno: userData.apellidoMaterno,
          edad: userData.edad,
          email: userData.email,
          area: userData.area,
          photo: userData.photo
        });
      } catch (error) {
        console.error('Error al cargar los datos del usuario', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchNotificaciones = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        const response = await axios.get('https://symbolic-truth-426104-r0.wl.r.appspot.com/api/user/notifications', config);
        updateNotifications(response.data.notifications);
      } catch (error) {
        console.error('Error al cargar las notificaciones', error);
      }
    };

    fetchUserData();
    fetchNotificaciones();
  }, [user.email, user.token, updateNotifications]);


  if (loading) {
    return <div>Cargando...</div>;
  }

  if (userData.area !== 'Jurídica') {
    return (
      <div className="p-8 w-full flex justify-center">
        <div className="w-3/5">
          <h1 className="text-2xl font-bold mb-4">Solo los usuarios del área de Jurídica pueden acceder a esta página</h1>
          <p className="text-lg">Tu área actual es: {userData.area}</p>
        </div>
      </div>
    );
  }

  const handleSendNotification = (area) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro de enviar esta notificación por correo a los usuarios del área ${area}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, enviar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para enviar la notificación
        Swal.fire(
          'Enviado',
          'La notificación ha sido enviada.',
          'success'
        );
      }
    });
  };

  return (
    <div className="p-8 w-full">
      <h1 className="text-2xl font-bold mb-4">Revisar Notificaciones</h1>
      <div className="mb-6">
        <div className={`p-4 rounded-lg shadow ${theme === lightTheme ? 'bg-white' : 'bg-white'}`}>
          <h2 className="text-lg font-bold text-black">Cambiar área, enviar o borrar la notificación</h2>
        </div>
      </div>
      <div className="space-y-4">
        {notifications.map((notificacion, index) => (
          <div key={index} className="relative p-4 rounded-lg shadow bg-white">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-md text-black text-justify mr-5">{notificacion}</div>
                <div className="text-sm text-gray-500">Área: {notificacion.area}</div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                  onClick={() => handleSendNotification(notificacion.area)}
                >
                  <FaCheck />
                </button>
                <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevisarNotificaciones;
