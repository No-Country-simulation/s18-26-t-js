'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BiPlusCircle } from 'react-icons/bi';

export default function NewRestaurantCard() {
  const router = useRouter();
  return (
    <div
      className='w-min py-8 border-[#45424C7A] border-[1px] rounded-md flex justify-center items-center flex-col cursor-pointer'
      onClick={() => router.push('/new-restaurant')}
    >
      <p className='text-[#FB6800] text-lg min-w-80 text-center'>
        Agregar un restaurante
      </p>
      <BiPlusCircle color='#FB6800' size={18} />
    </div>
  );
}
