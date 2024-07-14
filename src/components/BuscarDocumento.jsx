import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useTheme, lightTheme } from '../components/ThemeProvider'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const BuscarDocumento = () => {
  const { theme } = useTheme();
  const { title, intro, date } = useParams();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSearch = async () => {
    try {
      const result = await axios.post('http://localhost:5000/document_query', {
        query: query,
        intro: intro
      });
      setResponse(result.data.response);
      console.log(result.data.sources);
    } catch (error) {
      console.error('Error al realizar la consulta:', error);
      setResponse('Hubo un error al realizar la consulta. Inténtalo de nuevo.');
    }
  };

  // Manejar el evento de la tecla "Enter"
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="p-8 w-full">
      <div className="flex-grow">
      <h1 className="text-2xl font-bold mb-4">Realiza consultas específicas a este documento</h1>
        <h1 className="text-2xl font-bold mb-4">{title} {date}</h1>
        <div className="space-y-4">
          <div className={`p-4 rounded-lg shadow ${theme === lightTheme ? 'bg-white' : 'bg-gray-800'}`}>
            <input
              type="text"
              placeholder="Buscar..."
              className={`w-full p-2 border ${theme === lightTheme ? 'border-gray-300 bg-white text-black' : 'border-gray-600 bg-gray-700 text-white'} rounded`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown} // Añadir el evento onKeyDown aquí
            />
          </div>
          <div className={`p-4 rounded-lg shadow flex-grow ${theme === lightTheme ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
            <h2 className="text-lg font-bold mb-2">Respuesta</h2>
            <p>{response}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuscarDocumento;
