import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo512 from "../resources/logo512.png";
import { FaHome, FaBell, FaUsers, FaUser, FaQuestion } from 'react-icons/fa';
// import { FaCog} from 'react-icons/fa';

const SidebarContainer = styled.div`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  height: 100vh;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 16rem; /* Ajustar el ancho del sidebar */
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-center mb-5">
          <img className="w-20" src={logo512} alt="logo" />
        </div>
        <ul className="flex flex-col flex-1 space-y-8 mt-5">
          <li className="flex items-center"><FaHome className="mr-2" />
            <Link to="/">Inicio</Link>
          </li>
{/*           <li className="flex items-center"><FaCog className="mr-2" />
            <Link to="/consultarCambios">Consultar cambios</Link>
          </li> */}
          <li className="flex items-center"><FaBell className="mr-2" />
            <Link to="/notificaciones">Notificaciones</Link>
          </li>
          {/* <li className="flex items-center"><FaCog className="mr-2" />
            <Link to="/revisar-notificaciones">Revisar Notificaciones</Link>
          </li> */}
          <li className="flex items-center"><FaUsers className="mr-2" />
            <Link to="/empleados">Empleados</Link>
          </li>
          <li className="flex items-center"><FaUser className="mr-2" />
            <Link to="/profile">Modificar perfil</Link>
          </li>
          <li className="flex items-center"><FaQuestion className="mr-2" />
            <Link to="/ayuda">Ayuda</Link>
          </li>
        </ul>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
