'use client';

import React, { ReactNode } from 'react';
import Modal from './Modal';
import Link from 'next/link';
import { useVisibility } from '@/context/VisibilityContext';

interface AddReviewButtonProps {
  isUser: boolean | null;
  children: ReactNode;
}

export default function AddReviewButton({
  isUser,
  children,
}: AddReviewButtonProps) {
  const { isComponentVisible, handleShow } = useVisibility();

  if (!isUser) {
    return (
      <Link
        href='/auth/login'
        className='text-center bg-[#FB6800] cursor-pointer basis-[35%] font-medium  text-white-color px-5 py-1 rounded-md'
      >
        Agregar reseña
      </Link>
    );
  }

  return (
    <>
      <button
        onClick={() => handleShow('review')}
        type='button'
        className='text-center bg-[#FB6800] basis-[35%] font-medium  text-white-color px-5 py-1 rounded-md'
      >
        Agregar reseña
      </button>

      {isComponentVisible('review') && (
        <Modal modalId='review'>{children}</Modal>
      )}
    </>
  );
}
