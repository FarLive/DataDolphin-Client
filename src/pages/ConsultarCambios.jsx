import React from 'react';

const ConsultarCambios = () => {
  return (
    <div className="p-8 w-full">
      <h1 className="text-2xl font-bold mb-4">Consultar cambios de una legislación</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Título de la legislación"
          className="w-full p-3 border border-gray-300 rounded"
        />
      </div>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <div className="text-xl font-bold text-black">Título (año)</div>
            <div className="text-gray-600">Introducción</div>
          </div>
          {/*<a href="#" className="text-blue-600">fuente...</a>*/}
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <div className="text-xl font-bold text-black">Título (año)</div>
            <div className="text-gray-600">Introducción</div>
          </div>
          {/*<a href="#" className="text-blue-600">fuente...</a>*/}
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <div className="text-xl font-bold text-black">Título (año)</div>
            <div className="text-gray-600">Introducción</div>
          </div>
          {/*<a href="#" className="text-blue-600">fuente...</a>*/}
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <div className="text-xl font-bold text-black">Título (año)</div>
            <div className="text-gray-600">Introducción</div>
          </div>
          {/*<a href="#" className="text-blue-600">fuente...</a>*/}
        </div>
      </div>
    </div>
  );
};

export default ConsultarCambios;
