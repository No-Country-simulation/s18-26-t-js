'use client';

import React, { ReactNode } from 'react';
import Modal from './Modal';
import { useVisibility } from '@/context/VisibilityContext';

interface Props {
  children: ReactNode;
}

export default function DeleteRestaurantBtn({ children }: Props) {
  const { isComponentVisible, handleShow } = useVisibility();

  return (
    <>
      <button
        onClick={() => handleShow('delete-restaurant')}
        type='button'
        className='text-center bg-red-800 basis-[35%] font-medium  text-white-color px-5 py-1 rounded-md w-2/3 m-auto'
      >
        Eliminar Restaurante
      </button>

      {isComponentVisible('delete-restaurant') && (
        <Modal styles='max-w-[500px] mx-2' modalId='delete-restaurant'>
          {children}
        </Modal>
      )}
    </>
  );
}
