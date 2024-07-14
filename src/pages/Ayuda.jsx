import React from 'react';

const Ayuda = () => {
  return (
    <div className="p-8 w-full"> 
      <h1 className="text-2xl font-bold mb-4">Ayuda</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Manual de usuario</h2>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Preguntas frecuentes</h2>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold">¿Qué es el DOF?</h3>
            <p>El Diario Oficial de la Federación es la publicación periódica mediante la cual el gobierno mexicano promulga y da a conocer leyes, decretos, reglamentos, acuerdos, circulares, órdenes y otras disposiciones de observancia general en todo el territorio nacional.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">¿Desde qué fecha el bot puede contestar?</h3>
          <p>La base de datos con la que está entrenada el bot abarca desde principios de 2023 hasta la fecha actual.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">¿Por qué solo el usuario del área Jurídica puede ver la página de Empleados?</h3>
          <p>El sistema considera al usuario del área Jurídico como el superusuario, entonces él es el único que puede ver la página de Empleados, si requieres ese permiso comunícate con el administrador de la base de datos.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">¿Cada cuanto se actualiza la base de datos?</h3>
          <p>La base de datos de conocimiento contempla desde 2023; sin embargo, también se actualiza periodicamente para estar al día con las publicaciones del DOF; sin embargo, debido a que las publiaciones del DOF de la API no se realizan diario, la base de datos se actualizará cada semana.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">¿Los chats tienen memoria?</h3>
          <p>Tanto el chat de consultas generales que se encuentra en la página principal y el chat de consultas a documentos particulares, no tienen memoria, por lo que si quieres preguntar algo más especifico basado en mensajes anteriores del chat, deberás incluir esos detalles en tu consulta actual.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">¿Cómo puedo cambiar el correo de mi cuenta o el área a la que pertenezco?</h3>
            <p>Si eres del área Jurídica puedes ingresar a la página de Empleados y modificar tus datos; sin embargo, si no perteneces a esa área, pide que te cambien de área al administrador de la base de dato, o pide a un usuario jurídico que te cambie de área.</p>
        </div>
      </div>
    </div>
  );
};

export default Ayuda;
