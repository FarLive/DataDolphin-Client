import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { useTheme, lightTheme } from '../components/ThemeProvider'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const { theme } = useTheme();

  const areas = [
    { value: "Jurídica", label: "Jurídica"},
    { value: "Contraloría", label: "Contraloría"  },
    { value: "Tesorería", label: "Tesorería"  },
    { value: "Sistemas", label: "Sistemas"  },
    { value: "Negocio/productos", label: "Negocio/productos" },
    { value: "Contabilidad", label: "Contabilidad" }
  ];

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

    const fetchEmpleados = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        const response = await axios.get('https://symbolic-truth-426104-r0.wl.r.appspot.com/api/user/users', config);
        setEmpleados(response.data.users);
      } catch (error) {
        console.error('Error al cargar los datos de los empleados', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpleados();
  }, [user.email, user.token]);

  const handleInputChange = (id, field, value) => {
    setEmpleados((prevState) =>
      prevState.map((empleado) =>
        empleado._id === id ? { ...empleado, [field]: value } : empleado
      )
    );
  };

  const handleUpdate = async (id) => {
    const empleado = empleados.find((empleado) => empleado._id === id);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.put(`https://symbolic-truth-426104-r0.wl.r.appspot.com/api/user/update/${id}`, empleado, config);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Empleado actualizado con éxito',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al actualizar el empleado',
      });
      console.error('Error al actualizar el empleado:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.delete(`https://symbolic-truth-426104-r0.wl.r.appspot.com/api/user/user/${id}`, config);
      setEmpleados(empleados.filter(empleado => empleado._id !== id));
    } catch (error) {
      console.error('Error al borrar el usuario', error);
    }
  };

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

  return (
    <div className="p-8 w-full"> 
      <h1 className="text-2xl font-bold mb-4">Empleados</h1>
      <div className="overflow-x-auto">

        <table className={`min-w-full shadow-md rounded-lg ${theme === lightTheme ? 'bg-white' : 'bg-gray-800'}`}>
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-3 text-left">Empleado</th>
              <th className="py-3 px-3 text-left">Correo</th>
              <th className="py-3 px-3 text-left">Área</th>
              <th className="py-3 px-3 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody className={`divide-y ${theme === lightTheme ? 'divide-gray-200' : 'divide-gray-700'}`}>
            {empleados.map((empleado) => (
              <tr key={empleado._id} className={`hover:${theme === lightTheme ? 'bg-gray-100' : 'bg-gray-700'}`}>
                <td className="py-2 px-2">
                  {`${empleado.nombre} ${empleado.apellidoPaterno} ${empleado.apellidoMaterno}`}
                </td>
                <td className="py-2 px-2">
                  <input
                    type="email"
                    value={empleado.email}
                    onChange={(e) => handleInputChange(empleado._id, 'email', e.target.value)}
                    className={`w-full p-2 border ${theme === lightTheme ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-700'} rounded`}
                  />
                </td>
                <td className="py-2 px-2">
                  <Select 
                    value={areas.find(option => option.value === empleado.area)}
                    options={areas}
                    onChange={(selectedOption) => handleInputChange(empleado._id, 'area', selectedOption.value)}
                    className="w-full"
                    styles={{
                      control: (styles) => ({
                        ...styles,
                        backgroundColor: theme === lightTheme ? 'white' : '#374151',
                        borderColor: theme === lightTheme ? '#d1d5db' : '#4b5563'
                      }),
                      singleValue: (styles) => ({
                        ...styles,
                        color: theme === lightTheme ? 'black' : 'white'
                      })
                    }}
                  />
                </td>
                <td className="py-2 px-2 text-center flex justify-around">
                  <button
                    className="bg-green-500 text-white py-1 px-1 rounded hover:bg-green-700"
                    onClick={() => handleUpdate(empleado._id)}
                  >
                    Guardar
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(empleado._id)}
                  >
                    Eliminar usuario
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Empleados;
