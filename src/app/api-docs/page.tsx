// src/app/api-docs/page.tsx
import React from 'react';

const ApiDocs: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Documentación de la API</h1>

        <h2 className="text-2xl font-semibold mt-6">Autenticación</h2>
        <pre className="bg-gray-700 p-4 rounded">
          <code>
            <span className="text-green-400">POST</span> /api/auth/register - Registro de un nuevo usuario.
          </code>
        </pre>

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
            <span className="text-blue-400">GET</span> /api/restaurant/cities - Obtener ciudades de restaurantes (sin duplicados).
            <br />
            <span className="text-blue-400">GET</span> /api/restaurant/most-reviewed - Obtener los restaurantes más reseñados.
            <br />
            <span className="text-blue-400">GET</span> /api/restaurant/top-rated - Obtener los restaurantes mejor valorados.
          </code>
        </pre>

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

        <h2 className="text-2xl font-semibold mt-6">Usuario</h2>
        <pre className="bg-gray-700 p-4 rounded">
          <code>
            <span className="text-blue-400">GET</span> /api/user/profile - Obtener el perfil del usuario.
            <br />
            <span className="text-yellow-400">PUT</span> /api/user/profile - Actualizar el perfil del usuario.
          </code>
        </pre>
      </div>
    </div>
  );
};

export default ApiDocs;

