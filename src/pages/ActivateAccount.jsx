import React, { useState } from "react";
import { TERipple } from "tw-elements-react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";

export default function ActivateAccount() {
  const [verificationCode, setVerificationCode] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  
  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('https://symbolic-truth-426104-r0.wl.r.appspot.com/api/user/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ verificationCode })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        dispatch({ type: 'UPDATE_USER', payload: { active: true } }); // Actualiza el estado del usuario
        setTimeout(() => {
          navigate('/'); // Redirige a la página principal
        }, 2000);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Hubo un error al verificar la cuenta. Por favor, intenta de nuevo.');
    }
  };
  return (
    <section className="h-screen bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
      <div className="container p-10">
        <div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="px-4 md:px-0">
                <div className="md:mx-6 md:p-12">
                  <form onSubmit={handleSubmit} className="mt-8">
                    <p className="mb-4 text-center text-2xl font-bold">Ingresa tu codigo de verificacion</p>
                    {message && <p className="mb-4 text-center text-green-500">{message}</p>}
                    {error && <p className="mb-4 text-center text-red-500">{error}</p>}
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Verification Code"
                      className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                    <div className="mb-12 pb-1 pt-1 text-center">
                      <TERipple rippleColor="light">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="submit"
                          style={{
                            background:
                              "linear-gradient(54deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 33%, rgba(35,6,163,1) 52%, rgba(6,85,171,1) 100%, rgba(0,212,255,1) 100%)",
                          }}
                        >
                          Verificar
                        </button>
                      </TERipple>
                    </div>
                  </form>
                  {/* Link to login page */}
                  <div className="flex items-center justify-between pb-6">
                    <TERipple rippleColor="light">
                      <Link to='/login'>
                        <button
                          type="button"
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                          REGRESAR AL LOGIN
                        </button>
                      </Link>
                    </TERipple>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
