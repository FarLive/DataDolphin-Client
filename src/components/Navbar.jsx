import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NotificationIcon from './NotificationIcon';
import Avatar from './Avatar';
import { IoLogOut } from "react-icons/io5";
import { FaMoon, FaSun } from 'react-icons/fa';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTheme, lightTheme } from './ThemeProvider';
import { useNotificationContext } from '../context/NotificationContext';
import axios from 'axios';

const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  width: 100%;
`;

const NotificationPanel = styled.div`
  position: absolute;
  top: 60px;
  right: 10px;
  width: 300px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1000;
`;

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { theme, toggleTheme } = useTheme();
  const { notifications, updateNotifications } = useNotificationContext();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const toggleNotificationPanel = () => {
    setNotificationPanelOpen(!isNotificationPanelOpen);
  };

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        const response = await axios.get('https://symbolic-truth-426104-r0.wl.r.appspot.com/api/user/notifications', config);
        updateNotifications(response.data.notifications.slice(0, 5));
      } catch (error) {
        console.error('Error al cargar las notificaciones', error);
      } finally {
        setLoading(false);
      }
    };

    if (isNotificationPanelOpen) {
      fetchNotificaciones();
    }
  }, [isNotificationPanelOpen, user.token, updateNotifications]);


  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <NavbarContainer>
      <div className="container mx-auto flex justify-between items-center">
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6 bg-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className='mx-auto flex'>
        <div className="flex-grow"></div>
        <div className={`md:flex md:items-center space-x-4`}>
          <button onClick={toggleTheme} className="p-1.5 rounded">
            <div className={`w-10 h-6 rounded-full p-1 ${theme === lightTheme ? 'bg-gray-200' : 'bg-gray-600'}`}>
              <div className={`w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out flex items-center justify-center ${theme === lightTheme ? 'translate-x-4 bg-white' : 'bg-black'}`}>
                {theme === lightTheme ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-white" />}
              </div>
            </div>
          </button>
          <div className="relative">
            <button onClick={toggleNotificationPanel} className="p-1.5 rounded">
              <NotificationIcon />
            </button>
            {isNotificationPanelOpen && (
              <NotificationPanel>
                <div className="p-4 border-b">
                  <h3 className="text-lg font-bold">Notificaciones</h3>
                  <Link to="/notificaciones" className="text-sm text-blue-600 hover:underline">Visualizar todas</Link>
                </div>
                {loading ? (
                  <div className="p-4">Cargando...</div>
                ) : (
                  <div className="p-4">
                    {notifications.map((notificacion, index) => (
                      <div key={index} className="relative border-b py-2">
                    
                        <div className="text-black text-sm">
                          {truncateText(notificacion, 170)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </NotificationPanel>
            )}
          </div>
          <Link to="/profile">
            <Avatar url={user.photo} />
          </Link>
          <IoLogOut size='40px' onClick={handleLogout} className='cursor-pointer' />
        </div>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
