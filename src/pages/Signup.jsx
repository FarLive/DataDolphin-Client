import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { TypeAnimation } from 'react-type-animation';
import logo512 from "../resources/logo512.png";
import { Link } from 'react-router-dom';
import UploadWidget from "../components/UploadImage";
import { useSignup } from '../hooks/useSignUp';
import { HiEye, HiEyeOff } from "react-icons/hi";
import Select from 'react-select';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [edad, setEdad] = useState('');
  const [area, setArea] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState("");
  const [showPassword, setShowPassword] = useState(false);  // Estado para controlar la visibilidad de la contraseña 

  const areas = [
    { value: "Jurídica", label: "Jurídica"},
    { value: "Contraloría", label: "Contraloría"  },
    { value: "Tesorería", label: "Tesorería"  },
    { value: "Sistemas", label: "Sistemas"  },
    { value: "Negocio/productos", label: "Negocio/productos" },
    { value: "Contabilidad", label: "Contabilidad" }
  ];

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    console.log(area)

    e.preventDefault();
    // Verificar si se ha subido una foto
    if (!photo) {
      alert("Por favor, sube una imagen antes de registrarte.");
      return;
    }
  
    await signup(email, nombre, apellidoPaterno, apellidoMaterno, edad, area, password, photo);
  };

  const handleUpload = (url) => {
    setPhoto(url);
  };

  const handleAreaChange = (event) => {
    setArea(event.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
      <div className="container p-10">
        <div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="flex flex-wrap">
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
                      <p className="mb-4 mt-4">Crea tu cuenta</p>
                      {error && <div className='text-red-600 items-center'> {error} </div>}
                      <TEInput
                        type="email"
                        label="Correo"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4"
                        required
                      />

                      <TEInput
                        type="text"
                        label="Nombre"
                        name="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="mb-4"
                        required
                      />

                      <TEInput
                        type="text"
                        label="Apellido Paterno"
                        name="apellidoPaterno"
                        value={apellidoPaterno}
                        onChange={(e) => setApellidoPaterno(e.target.value)}
                        className="mb-4"
                        required
                      />

                      <TEInput
                        type="text"
                        label="Apellido Materno"
                        name="apellidoMaterno"
                        value={apellidoMaterno}
                        onChange={(e) => setApellidoMaterno(e.target.value)}
                        className="mb-4"
                        required
                      />

                      <TEInput
                        type="number"
                        label="Edad"
                        name="edad"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                        className="mb-4"
                        required
                      />

                      <Select
                        placeholder="Área"
                        name="area"
                        options = {areas}
                        onChange={handleAreaChange}
                        className="mb-4"
                        required
                      />                      

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

                      {/* Subir imagen */}
                      <UploadWidget onUpload={handleUpload}/>

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
                            REGISTRAR
                          </button>
                        </TERipple>
                      </div>
                    </form>

                    {/* Link to login page */}
                    <div className="flex items-center justify-between pb-6">
                      <p className="mb-0 mr-2">¿Ya tienes una cuenta?</p>
                      <TERipple rippleColor="light">
                        <Link to='/login'>
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          >
                            INGRESAR
                          </button>
                        </Link>
                      </TERipple>
                    </div>
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
                        'We are Data',
                        900,
                        'We are Dolphins',
                        1000,
                      ]}
                      wrapper="span"
                      speed={50}
                      style={{ fontSize: '2em', display: 'inline-block' }}
                      repeat={Infinity}
                    />
                    <p className="text">
                      Equipo especializado en utilizar IA para analizar el Diario Oficial de la Nación.
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
