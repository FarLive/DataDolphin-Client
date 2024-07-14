import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UploadWidget from './UploadImage';
import Swal from 'sweetalert2';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTheme, lightTheme } from '../components/ThemeProvider'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const Profile = () => {
  const { user, dispatch } = useAuthContext();
  const { theme } = useTheme();

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
      }
    };

    fetchUserData();
  }, [user.email, user.token]);

  const handleImageUpload = (imageUrl) => {
    setUserData({ ...userData, photo: imageUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const response = await axios.put(`https://symbolic-truth-426104-r0.wl.r.appspot.com/api/user/update/${userData.id}`, userData, config);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Usuario actualizado con éxito',
      });
      dispatch({ type: 'UPDATE_USER', payload: userData });
      console.log('Usuario actualizado con éxito:', response.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al actualizar el usuario',
      });
      console.error('Error al actualizar el usuario:', error);
    }
  };

  return (
    <div className="p-8 w-full flex justify-center">
      <div className="w-3/5">
        <h1 className="text-2xl font-bold mb-4">Modificar perfil</h1>

        <div className="bg-gradient-to-r from-blue-300 to-blue-500 p-8 rounded-lg mb-6 flex items-center">
          <img src={userData.photo} className="w-20 h-20 object-cover rounded-full mr-6" alt="Avatar" />
          <div>
            <div className="text-4xl text-white mb-2">{userData.nombre}</div>
            <div className="text-white">{userData.email}</div>
          </div>
        </div>
        
        <form className={`p-6 rounded-lg shadow-md ${theme === lightTheme ? 'bg-white' : 'bg-gray-800'}`} onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className={`block text-sm font-bold mb-1 ${theme === lightTheme ? 'text-gray-700' : 'text-gray-300'}`} htmlFor="nombre">Nombre</label>
            <input className={`w-full p-1 border ${theme === lightTheme ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-700 text-white'} rounded`} type="text" id="nombre" placeholder="Nombre" value={userData.nombre} onChange={e => setUserData({ ...userData, nombre: e.target.value })} />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-1 ${theme === lightTheme ? 'text-gray-700' : 'text-gray-300'}`} htmlFor="apellidoPaterno">Apellido Paterno</label>
            <input className={`w-full p-1 border ${theme === lightTheme ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-700 text-white'} rounded`} type="text" id="apellidoPaterno" placeholder="Apellido Paterno" value={userData.apellidoPaterno} onChange={e => setUserData({ ...userData, apellidoPaterno: e.target.value })} />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-1 ${theme === lightTheme ? 'text-gray-700' : 'text-gray-300'}`} htmlFor="apellidoMaterno">Apellido Materno</label>
            <input className={`w-full p-1 border ${theme === lightTheme ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-700 text-white'} rounded`} type="text" id="apellidoMaterno" placeholder="Apellido Materno" value={userData.apellidoMaterno} onChange={e => setUserData({ ...userData, apellidoMaterno: e.target.value })} />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-1 ${theme === lightTheme ? 'text-gray-700' : 'text-gray-300'}`} htmlFor="edad">Edad</label>
            <input className={`w-full p-1 border ${theme === lightTheme ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-700 text-white'} rounded`} type="number" id="edad" placeholder="Edad" min="1" value={userData.edad} onChange={e => setUserData({ ...userData, edad: e.target.value })} />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-1 ${theme === lightTheme ? 'text-gray-700' : 'text-gray-300'}`} htmlFor="photo">Foto de perfil</label>
            <UploadWidget onUpload={handleImageUpload} disabled={false} />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-1 ${theme === lightTheme ? 'text-gray-700' : 'text-gray-300'}`} htmlFor="email">Email</label>
            <input className={`w-full p-1 border ${theme === lightTheme ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-700 text-white'} rounded`} type="text" id="email" value={userData.email} disabled />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-bold mb-1 ${theme === lightTheme ? 'text-gray-700' : 'text-gray-300'}`} htmlFor="area">Área</label>
            <input className={`w-full p-1 border ${theme === lightTheme ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-700 text-white'} rounded`} type="text" id="area" value={userData.area} disabled />
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded" type="submit">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

