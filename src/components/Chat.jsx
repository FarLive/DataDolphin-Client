import React, { useState } from 'react';
import axios from 'axios';
import { useTheme, lightTheme } from '../components/ThemeProvider'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const Chat = ({ user }) => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [waitingResponse, setWaitingResponse] = useState(false); // Estado para controlar si se está esperando una respuesta del bot

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || waitingResponse) return; // Evitar enviar mensajes si el campo está vacío o se está esperando una respuesta

    setWaitingResponse(true); // Establecer que se está esperando una respuesta
    setNewMessage(''); // Borrar el contenido del campo de texto

    const messageObject = { text: newMessage, sender: 'user' };
    setMessages([...messages, messageObject]);

    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      };
      const response = await axios.post('http://localhost:5000/query', { query: newMessage }, config);
      const botResponse = response.data.response;

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: 'bot' }
      ]);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Error al enviar el mensaje. Inténtalo de nuevo más tarde.', sender: 'bot' }
      ]);
    }

    setWaitingResponse(false); // Establecer que ya no se está esperando una respuesta
  };

  return (
    <div className={`p-1 rounded-lg shadow-md h-3/4 flex flex-col justify-between ${theme === lightTheme ? 'bg-gray-100' : 'bg-sky-950'}`}>
      <div className={`p-1 rounded-t-lg text-center font-bold ${theme === lightTheme ? 'bg-gray-300' : 'bg-blue-600 text-white'}`}>Chat-DOF</div>
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-500 text-white self-end ml-auto w-3/4' : `${theme === lightTheme ? 'bg-gray-300' : 'bg-blue-800 text-white'} self-start w-3/4`}`}
            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex mt-4">
        <input
          type="text"
          className={`flex-1 p-2 border rounded-l-lg ${theme === lightTheme ? 'bg-white' : 'bg-blue-700 text-white'}`}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
          disabled={waitingResponse} // Deshabilitar el campo mientras se está esperando una respuesta
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg" disabled={waitingResponse}>Enviar</button> {/* Deshabilitar el botón mientras se está esperando una respuesta */}
      </form>
    </div>
  );
};

export default Chat;
