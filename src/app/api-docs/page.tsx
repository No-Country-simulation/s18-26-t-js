// src/app/api-docs/page.tsx
import React from 'react';

const ApiDocs: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Documentación de la API</h1>

        {/* Sección de Autenticación */}
        <h2 className="text-2xl font-semibold mt-6">Autenticación</h2>
        <pre className="bg-gray-700 p-4 rounded">
          <code>
            <span className="text-green-400">POST</span> /api/auth/register - Registro de un nuevo usuario.
          </code>
        </pre>

        {/* Sección de Restaurantes */}
        <h2 className="text-2xl font-semibold mt-6">Restaurantes</h2>
        <pre className="bg-gray-700 p-4 rounded">
          <code>
            <span className="text-blue-400">GET</span> /api/restaurant - Obtener todos los restaurantes.
            <br />
            <span className="text-green-400">POST</span> /api/restaurant - Crear un nuevo restaurante.
            <br />
            <span className="text-blue-400">GET</span> /api/restaurant/[id] - Obtener un restaurante por ID.
            <br />
            <span className="text-yellow-400">PUT</span> /api/restaurant/[id] - Actualizar un restaurante por ID.
            <br />
            <span className="text-red-400">DELETE</span> /api/restaurant/[id] - Eliminar un restaurante por ID.
            <br />
            <span className="text-blue-400">GET</span> /api/restaurant/search - Buscar restaurante por nombre.
          </code>
        </pre>

        {/* Sección de Categorías */}
        <h2 className="text-2xl font-semibold mt-6">Categorías</h2>
        <pre className="bg-gray-700 p-4 rounded">
          <code>
            <span className="text-blue-400">GET</span> /api/categories - Obtener todas las categorías.
            <br />
            <span className="text-green-400">POST</span> /api/categories - Crear una nueva categoría.
            <br />
            <span className="text-blue-400">GET</span> /api/categories/[id] - Obtener una categoría por ID.
            <br />
            <span className="text-yellow-400">PUT</span> /api/categories/[id] - Actualizar una categoría por ID.
            <br />
            <span className="text-red-400">DELETE</span> /api/categories/[id] - Eliminar una categoría por ID.
          </code>
        </pre>

        {/* Sección de Ciudades */}
        <h2 className="text-2xl font-semibold mt-6">Ciudades</h2>
        <pre className="bg-gray-700 p-4 rounded">
          <code>
            <span className="text-blue-400">GET</span> /api/cities - Obtener todas las ciudades.
            <br />
            <span className="text-green-400">POST</span> /api/cities - Crear una nueva ciudad.
            <br />
            <span className="text-blue-400">GET</span> /api/cities/[id] - Obtener una ciudad por ID.
            <br />
            <span className="text-yellow-400">PUT</span> /api/cities/[id] - Actualizar una ciudad por ID.
            <br />
            <span className="text-red-400">DELETE</span> /api/cities/[id] - Eliminar una ciudad por ID.
          </code>
        </pre>

        {/* Sección de Reseñas */}
        <h2 className="text-2xl font-semibold mt-6">Reseñas</h2>
        <pre className="bg-gray-700 p-4 rounded">
          <code>
            <span className="text-blue-400">GET</span> /api/reviews - Obtener todas las reseñas.
            <br />
            <span className="text-green-400">POST</span> /api/reviews - Crear una nueva reseña.
            <br />
            <span className="text-blue-400">GET</span> /api/reviews/[id] - Obtener una reseña por ID.
            <br />
            <span className="text-yellow-400">PUT</span> /api/reviews/[id] - Actualizar una reseña por ID.
            <br />
            <span className="text-red-400">DELETE</span> /api/reviews/[id] - Eliminar una reseña por ID.
            <br />
            <span className="text-blue-400">GET</span> /api/reviews/restaurante/[id] - Obtener reseñas por ID de restaurante.
            <br />
            <span className="text-blue-400">GET</span> /api/reviews/usuario/[id] - Obtener reseñas por ID de usuario.
          </code>
        </pre>

        {/* Sección de Usuario */}
        <h2 className="text-2xl font-semibold mt-6">Usuarios</h2>
        <pre className="bg-gray-700 p-4 rounded">
          <code>
            <span className="text-blue-400">GET</span> /api/users - Obtener todos los usuarios.
            {/* <br />
            <span className="text-green-400">POST</span> /api/users - Crear un nuevo usuario. */}
            <br />
            <span className="text-blue-400">GET</span> /api/users/[id] - Obtener un usuario por ID.
            {/* <br />
            <span className="text-yellow-400">PUT</span> /api/users/[id] - Actualizar un usuario por ID. */}
            {/* <br />
            <span className="text-red-400">DELETE</span> /api/users/[id] - Eliminar un usuario por ID. */}
            <br />
            <span className="text-yellow-400">PUT</span> /api/users/[id]/update - Actualizar información del perfil del usuario.
          </code>
        </pre>

      </div>
    </div>
  );
};

export default ApiDocs;

