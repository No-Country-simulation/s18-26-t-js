import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <div className='flex flex-col items-center justify-center h-screen text-center bg-gray-100'>
        <h1 className='text-4xl font-bold text-red-800 mb-4'>
          Página No Encontrada
        </h1>
        <p className='text-lg text-gray-700 mb-6'>
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <Link href='/'>Regresar a la página principal</Link>
      </div>
    </div>
  );
}
