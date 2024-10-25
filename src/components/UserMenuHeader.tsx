'use client';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';

export default function UserMenuHeader() {
  const [openOptions, setOpenOptions] = useState(false);
  const toggleOptions = () => {
    setOpenOptions(!openOptions);
  };
  const user = useSession();
  // console.log(user);

  return (
    <div className='flex justify-end items-center relative'>
      <span
        className='hover:cursor-pointer focus:outline-none w-8 aspect-square relative z-50'
        onClick={toggleOptions}
        color='#FB6800'
      >
        {user.data ? (
          <Image
            className='rounded-full'
            src={'https://picsum.photos/50'}
            alt=''
            fill
          />
        ) : (
          <BiUserCircle size={32} color='#FB6800' />
        )}
      </span>

      {openOptions && (
        <div
          className='border w-40 p-4 absolute top-[calc(100%+1.25rem)] bg-white rounded-xl flex flex-col divide-y font-semibold text-[#747178] z-20'
          onMouseLeave={() => setOpenOptions(false)}
        >
          {user.data ? (
            <>
              <Link className='py-2  hover:text-black' href={'/profileUser'}>
                Perfil
              </Link>
              <Link className='py-2  hover:text-black' href={'/'}>
                Ayuda
              </Link>
              <p
                className='py-2  hover:text-black hover:cursor-pointer'
                onClick={() => {
                  signOut();
                }}
              >
                Cerrar sesión
              </p>
            </>
          ) : (
            <>
              <Link className='py-2  hover:text-black' href={'/auth/login'}>
                Iniciar sesión
              </Link>
              <Link className='py-2  hover:text-black' href={'/auth/register'}>
                Registrarse
              </Link>
              <Link className='py-2  hover:text-black' href={'/'}>
                Ayuda
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
