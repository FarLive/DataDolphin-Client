import React, { useState, useEffect } from 'react';
import axios from 'axios';
import News from '../components/News';
import { useAuthContext } from "../hooks/useAuthContext";
import Chat from '../components/Chat'; // Ajusta la ruta según tu estructura de archivos

function Main() {
  const [news, setNews] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        const response = await axios.get('https://symbolic-truth-426104-r0.wl.r.appspot.com/api/news/getNews', config);
        setNews(response.data);
      } catch (error) {
        console.error('Error al cargar las noticias:', error);
      }
    };

    fetchNews();
  }, [user.token]);

  return (
    <div className="p-8 w-full flex">
      <div className='text-2xl text-secondary-700 md:w-10/12 mr-10'>
        <div className='mt-4'>
          Te podría interesar...
          <div className="h-screen overflow-y-auto pr-2"> {/* Clases Tailwind para altura y desplazamiento */}
            {news.length > 0 ? (
              news.map((item, index) => (
                <div className="mt-5" key={index}>
                  <div className="text-justify">
                    <News intro={item.resumen} title={item.titulo} date={item.fecha}/>
                  </div>
                </div>
              ))
            ) : (
              <div className='mt-5'>No hay noticias disponibles.</div>
            )}
          </div>
        </div>
      </div>
      
      <div className='w-2/5 h-screen'>
        <Chat user={user} />
      </div>
    </div>
  );
}

export default Main;

