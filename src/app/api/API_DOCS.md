# Documentación de la API

## Autenticación
- `POST /api/auth/register` - Registro de un nuevo usuario.

## Restaurantes
- `GET /api/restaurant` - Obtener todos los restaurantes.
- `POST /api/restaurant` - Crear un nuevo restaurante.
- `GET /api/restaurant/[id]` - Obtener un restaurante por ID.
- `PUT /api/restaurant/[id]` - Actualizar un restaurante por ID.
- `DELETE /api/restaurant/[id]` - Eliminar un restaurante por ID.
- `GET /api/restaurant/cities` - Obtener ciudades de restaurantes (sin duplicados).
- `GET /api/restaurant/most-reviewed` - Obtener los restaurantes más reseñados.
- `GET /api/restaurant/top-rated` - Obtener los restaurantes mejor valorados.

## Reseñas
- `GET /api/reviews` - Obtener todas las reseñas.
- `POST /api/reviews` - Crear una nueva reseña.
- `GET /api/reviews/[id]` - Obtener una reseña por ID.
- `PUT /api/reviews/[id]` - Actualizar una reseña por ID.
- `DELETE /api/reviews/[id]` - Eliminar una reseña por ID.
- `GET /api/reviews/restaurante/[id]` - Obtener reseñas por ID de restaurante.
- `GET /api/reviews/usuario/[id]` - Obtener reseñas por ID de usuario.

## Usuario
- `GET /api/user/profile` - Obtener el perfil del usuario.
- `PUT /api/user/profile` - Actualizar el perfil del usuario.
