'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiUserCircle } from 'react-icons/bi';

export default function UserMenuHeader() {
  const [openOptions, setOpenOptions] = useState(false);

  return (
    <div className='flex justify-end items-center relative'>
      <BiUserCircle
        tabIndex={0}
        onClick={() => setOpenOptions(true)}
        color='#FB6800'
        size={32}
        className='hover:cursor-pointer focus:outline-none'
      />
      {openOptions && (
        <div
          className='border w-40 p-4 absolute top-[calc(100%+1.25rem)] bg-white rounded-xl flex flex-col divide-y font-semibold text-[#747178] z-20'
          onMouseLeave={() => setOpenOptions(false)}
        >
          <Link className='py-2  hover:text-black' href={'/auth/login'}>
            Iniciar sesión
          </Link>
          <Link className='py-2  hover:text-black' href={'/auth/register'}>
            Registrarse
          </Link>
          <Link className='py-2  hover:text-black' href={'/'}>
            Ayuda
          </Link>
        </div>
      )}
    </div>
  );
}
