import React from 'react';
import { IoIosArrowForward, IoIosDownload } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function News({ title, intro, date }) {
  const navigate = useNavigate();
  const code = title.split(" ")[1];

  const handleButtonClick = () => {
    navigate(`/buscar-documento/${encodeURIComponent(title)}/${encodeURIComponent(intro)}/${encodeURIComponent(date)}`);
  };

  const handleDownloadClick = async () => {
    const url = `https://sidofqa.segob.gob.mx/dof/sidof/documentos/pdf/${code}`;
    
    try {
      const response = await fetch(url);
      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${code}.pdf`;
        link.click();
        window.URL.revokeObjectURL(link.href);
      } else {
        console.error("La solicitud GET no fue exitosa. Código de estado:", response.status);
      }
    } catch (error) {
      console.error("Hubo un error al intentar descargar el documento:", error);
    }
  };

  return (
    <div className="shadow-lg bg-slate-50 rounded-lg flex p-4 sm:w-full h-auto relative">
      <div className="flex-grow">
        <div className="flex items-center ">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <div className="flex items-center">
            <span className="text-xl font-bold  mb-2 ml-3">{date}</span>
            <button 
              className="text-blue-500 p-1 flex  mb-2"
              onClick={handleDownloadClick}
            >
              <IoIosDownload />
            </button>
          </div>
        </div>
        <p className="text-sm">{intro}</p>
      </div>
      <div className="flex items-center justify-center ml-5">
        <button 
          className="bg-blue-500 text-white px-2 py-2 rounded-full flex items-center"
          onClick={handleButtonClick}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
  
}

export default News;
