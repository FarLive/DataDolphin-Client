import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import logo512 from "../resources/logo512.png"
import { TypeAnimation } from 'react-type-animation';
import { useLogin } from "../hooks/useLogin";
import { Link } from 'react-router-dom';
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // Estado para controlar la visibilidad de la contraseña 

  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login( email, password );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="h-screen flex justify-center items-center bg-neutral-200 dark:bg-neutral-700">

      <div className="container">
        <div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* Logo */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src={logo512}
                        alt="logo"
                      />
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p className="mb-4 mt-4">Por favor, ingrese su cuenta</p>
                      {error && <div className='text-red-600 items-center'> {error} </div>}
                      {/* Username input */}
                      <TEInput
                        type="text"
                        label="Correo"
                        className="mb-4"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      ></TEInput>

                      <div className="relative mb-4">
                        <TEInput
                          type={showPassword ? "text" : "password"} // Usa el estado showPassword para determinar el tipo de entrada
                          label="Contraseña"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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


                      {/* Submit button */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                            disabled={isLoading}
                            style={{
                              background:
                                "linear-gradient(54deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 33%, rgba(35,6,163,1) 52%, rgba(6,85,171,1) 100%, rgba(0,212,255,1) 100%)",
                            }}
                          >
                            Ingresar
                          </button>
                        </TERipple>

                        {/* Forgot password link */}
                        <a href="./RecuperarContraseña">¿Olvidaste tu contraseña?</a>
                      </div>

                      {/* Register button */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">¿No tienes una cuenta?</p>
                        <TERipple rippleColor="light">
                          <Link to='/signup'>
                            <button
                              type="button"
                              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            >
                              Registrar
                            </button>
                          </Link>
                        </TERipple>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right column container with background and description */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                    "linear-gradient(54deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 33%, rgba(35,6,163,1) 52%, rgba(6,85,171,1) 100%, rgba(0,212,255,1) 100%)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">

                    <TypeAnimation
                      sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'We are Data',
                        900, // wait 1s before replacing
                        'We are Dolphins',
                        1000,
                      ]}
                      wrapper="span"
                      speed={50}
                      style={{ fontSize: '2em', display: 'inline-block' }}
                      repeat={Infinity}
                    />

                    <p className="text">
                      Equipo especializado en usar IA para analizar el Diario Oficial de la Nación.
                    </p>

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
