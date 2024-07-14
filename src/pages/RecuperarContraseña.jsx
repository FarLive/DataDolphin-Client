import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const RecuperarContraseña = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('https://symbolic-truth-426104-r0.wl.r.appspot.com/api/user/request-password-reset', { email });
      setError(null);
      Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        text: 'Correo de recuperación enviado con éxito.',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Hubo un error al enviar el correo de recuperación.');
    }
    setIsLoading(false);
  };

  return (
    <section className="h-screen flex justify-center items-center bg-neutral-200 dark:bg-neutral-700">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-center text-2xl font-bold mb-4">Ingresa el correo asociado a tu cuenta</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className='text-red-600 mb-4'>{error}</div>}
          <TEInput
            type="text"
            label="Correo"
            className="mb-4"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></TEInput>
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
                Enviar código de verificación
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
