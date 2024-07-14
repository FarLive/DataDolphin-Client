import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from "./components/Navbar";
import Sidebar from './components/Sidebar.jsx';
import Profile from './components/Profile';
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ActivateAccount from "./pages/ActivateAccount";
import RecuperarContraseña from "./pages/RecuperarContraseña.jsx";
import ConsultarCambios from './pages/ConsultarCambios';
import Notificaciones from './pages/Notificaciones';
import RevisarNotificaciones from './pages/RevisarNotificaciones';
import Empleados from './pages/Empleados';
import Ayuda from './pages/Ayuda';
import BuscarDocumento from './components/BuscarDocumento.jsx';
import { ThemeProvider, useTheme, lightTheme } from './components/ThemeProvider';
import RecuperarContraseñaForm from './pages/RecuperarContraseñaForm.jsx';

function AppContent() {
  const { user } = useAuthContext();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === lightTheme ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
      <BrowserRouter>
        {user && user.active && <Navbar />}
        <Routes>
          <Route 
            path='/login' 
            element={!user ? <Login /> : <Navigate to="/" />} 
          />
          <Route 
            path='/signup' 
            element={!user ? <Signup /> : <Navigate to="/" />} 
          />
          <Route 
            path='/activate-account' 
            element={user ? (user.active ? <Navigate to="/" /> : <ActivateAccount />) : <Navigate to="/login" />} 
          />
          <Route 
            path='/RecuperarContraseña' 
            element={!user ? <RecuperarContraseña /> : <Navigate to="/" />} 
          />
          <Route 
            path='/recuperar-contraseña-form/:code' 
            element={!user ? <RecuperarContraseñaForm /> : <Navigate to="/" />} 
          />
        </Routes>

        <div className="flex">
          {user && user.active && <Sidebar />}

          <div className="flex-grow ml-64">
            <Routes>
              <Route 
                path='/profile' 
                element={user ? (user.active ? <Profile /> : <Navigate to="/activate-account" />) : <Navigate to="/login" />} 
              />
              <Route 
                path='/' 
                element={user ? (user.active ? <Main /> : <Navigate to="/activate-account" />) : <Navigate to="/login" />} 
              />
              <Route 
                path='/consultarCambios' 
                element={user ? (user.active ? <ConsultarCambios /> : <Navigate to="/activate-account" />) : <Navigate to="/login" />} 
              />
              <Route 
                path='/notificaciones' 
                element={user ? (user.active ? <Notificaciones /> : <Navigate to="/activate-account" />) : <Navigate to="/login" />} 
              />
              <Route 
                path='/revisar-notificaciones' 
                element={user ? (user.active ? <RevisarNotificaciones /> : <Navigate to="/activate-account" />) : <Navigate to="/login" />} 
              />
              <Route 
                path='/empleados' 
                element={user ? (user.active ? <Empleados /> : <Navigate to="/activate-account" />) : <Navigate to="/login" />} 
              />
              <Route 
                path='/ayuda' 
                element={user ? (user.active ? <Ayuda /> : <Navigate to="/activate-account" />) : <Navigate to="/login" />}
              />
              <Route 
                path='/buscar-documento/:title/:intro/:date' 
                element={user ? (user.active ? <BuscarDocumento /> : <Navigate to="/activate-account" />) : <Navigate to="/login" />} 
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

