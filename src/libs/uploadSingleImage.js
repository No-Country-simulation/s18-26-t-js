import cloudinary from './cloudinary';

/**
 * Subir una unica imagen a Cloudinary y devolver la URL.
 * @param {File} image - La imagen a subir.
 * @param {string} folder - Carpeta opcional para almacenar la imagen en Cloudinary.
 * @returns {Promise<string>} - La URL de la imagen subida.
 */
export const uploadSingleImage = async (image, folder = 'NoCountryS18') => {
  try {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
// eslint-disable-next-line no-undef
    const result = await new Promise((res, rej) => {
      cloudinary.uploader.upload_stream(
        { folder }, 
        (error, result) => {
          if (error) rej(error);
          res(result);
        }
      ).end(buffer);
    });

    const optimizedUrl = cloudinary.url(result.public_id, {
      fetch_format: 'auto',
      quality: 'auto',
      crop: 'limit', // Evita redimensionar
      // width: 300,
      // height: 300,
      // crop: 'fill',
    });

    return optimizedUrl; // Devolver la URL optimizada de la imagen
  } catch (error) {
    console.error('Error al subir la imagen a Cloudinary:', error);
    throw new Error('Error al subir la imagen');
  }
};
