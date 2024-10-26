import cloudinary from '@/libs/cloudinary'

export default async function uploadImages(images) {
  /*
    images: [
      File {
        size: 192586,
        type: 'image/png',
        name: 'Captura de pantalla 2024-01-09 183129.png',
        lastModified: 1729273642185
      },
      File {
        size: 61563,
        type: 'image/png',
        name: 'Captura de pantalla 2024-01-09 184028.png',
        lastModified: 1729273642185
      },
    ]
  */
  const uploadedFiles = [];

  for (const image of images) {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
// eslint-disable-next-line no-undef
    const result = await new Promise((res, rej) => {
      cloudinary.uploader.upload_stream({
        folder: 'NoCountryS18'
      }, (error, result) => {
        if (error) rej(error)
        res(result)
      }).end(buffer)
    })

    const optimizedUrl = cloudinary.url(result.public_id, {
      fetch_format: 'auto',
      quality: 'auto',
      width: 300,
      height: 300,
      crop: 'fill',
    })

    uploadedFiles.push(optimizedUrl)
  }

  return uploadedFiles;
}