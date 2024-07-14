import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { HiEye, HiEyeOff } from "react-icons/hi";
import Swal from 'sweetalert2';

const RecuperarContraseña = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { code } = useParams();
  const [showPassword, setShowPassword] = useState(false);  // Estado para controlar la visibilidad de la contraseña 


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setIsLoading(true);
    try {
        await axios.post('https://symbolic-truth-426104-r0.wl.r.appspot.com/api/user/reset-password', { resetCode:code, newPassword:newPassword});
        setError(null);
        Swal.fire({
            icon: 'success',
            title: 'Contraseña restablecida',
            text: 'Contraseña restablecida con éxito.',
        });
    } catch (err) {
      setError(err.response.data.error || 'Hubo un error al actualizar la contraseña.');
    }
    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="h-screen flex justify-center items-center bg-neutral-200 dark:bg-neutral-700">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-center text-2xl font-bold mb-4">Recupera tu contraseña</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className='text-red-600 mb-4'>{error}</div>}

          <div className="relative mb-4">
            <TEInput
                type={showPassword ? "text" : "password"} // Usa el estado showPassword para determinar el tipo de entrada
                label="Ingresa nueva contraseña"
                name="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mb-4 pr-10" // Ajusta el padding derecho para el botón de ojo
                required
            />
            {/* Botón de ojo */}
            <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={togglePasswordVisibility}
            >
                {showPassword ? <HiEyeOff className="h-5 w-5 text-neutral-600" /> : <HiEye className="h-5 w-5 text-neutral-600" />}
            </button>
            </div>
            <div className="relative mb-4">
            <TEInput
                type={showPassword ? "text" : "password"} // Usa el estado showPassword para determinar el tipo de entrada
                label="Repite la nueva contraseña"
                name="password"
                value={confirmPassword}
                onChange={(e) =>  setConfirmPassword(e.target.value)}
                className="mb-4 pr-10" // Ajusta el padding derecho para el botón de ojo
                required
            />
            {/* Botón de ojo */}
            <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={togglePasswordVisibility}
            >
                {showPassword ? <HiEyeOff className="h-5 w-5 text-neutral-600" /> : <HiEye className="h-5 w-5 text-neutral-600" />}
            </button>
            </div>
            
          <div className="text-center">
            <TERipple rippleColor="light" className="w-full">
              <button
                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                type="submit"
                disabled={isLoading}
                style={{
                  background: "linear-gradient(54deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 33%, rgba(35,6,163,1) 52%, rgba(6,85,171,1) 100%, rgba(0,212,255,1) 100%)",
                }}
              >
                Guardar
              </button>
            </TERipple>
          </div>
        </form>
        <div className="mt-4 text-center">
          <TERipple rippleColor="light">
            <Link to='/login'>
              <button
                type="button"
                className="inline-block rounded border-2 border-red-600 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-red-600 transition duration-150 ease-in-out hover:border-red-700 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-red-700 focus:border-red-700 focus:text-red-700 focus:outline-none focus:ring-0 active:border-red-800 active:text-red-800"
              >
                Regresar al login
              </button>
            </Link>
          </TERipple>
        </div>
      </div>
    </section>
  );
};

export default RecuperarContraseña;
