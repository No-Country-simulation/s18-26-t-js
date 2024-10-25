'use client';

import React, { ReactNode } from 'react';
import { useOpenModal } from '@/context/ModalContext';
import Modal from './Modal';
import Link from 'next/link';

interface AddReviewButtonProps {
  isUser: { user: { owner: boolean } } | null;
  children: ReactNode;
}

export default function AddReviewButton({
  isUser,
  children,
}: AddReviewButtonProps) {
  const { openModal, handleOpenModal } = useOpenModal();

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

  if (isUser.user.owner) return null;

  return (
    <>
      <button
        onClick={handleOpenModal}
        type='button'
        className='text-center bg-[#FB6800] basis-[35%] font-medium  text-white-color px-5 py-1 rounded-md'
      >
        Agregar reseña
      </button>

      {openModal && <Modal>{children}</Modal>}
    </>
  );
}
