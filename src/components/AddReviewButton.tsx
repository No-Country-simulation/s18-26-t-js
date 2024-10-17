'use client';

import React, { useState, ReactNode } from 'react';
import Modal from './Modal';
import Link from 'next/link';

interface AddReviewButtonProps {
  isUser: boolean | null;
  children: ReactNode;
}

export default function AddReviewButton({
  isUser,
  children,
}: AddReviewButtonProps) {
  const [openModal, setOpenModal] = useState(false);

  if (!isUser) {
    return (
      <Link
        href='/auth/login'
        className='bg-[#FB6800] cursor-pointer basis-[35%] font-medium  text-white-color px-5 py-1 rounded-md'
      >
        Agregar reseña
      </Link>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        type='button'
        className='bg-[#FB6800] basis-[35%] font-medium  text-white-color px-5 py-1 rounded-md'
      >
        Agregar reseña
      </button>

      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>{children}</Modal>
      )}
    </>
  );
}
