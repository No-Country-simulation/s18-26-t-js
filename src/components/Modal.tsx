import React, { ReactNode } from 'react';
import { GoX } from 'react-icons/go';
import { useVisibility } from '@/context/VisibilityContext';

interface ModalProps {
  children: ReactNode;
  modalId: string;
}

export default function Modal({ children, modalId }: ModalProps) {
  const { handleHide } = useVisibility();

  return (
    <div className='fixed  w-full h-full z-50 top-0 bottom-0 left-0 flex items-center justify-center'>
      <div
        onClick={() => handleHide(modalId)}
        className='bg-[#45424B80] w-full h-full absolute cursor-pointer'
      ></div>

      <div className='scrollBar p-5 w-[80%] h-[85%] shadow-xl relative bg-[--white-color] rounded-xl'>
        <div className='flex  justify-end'>
          <button
            onClick={() => handleHide(modalId)}
            className='self-end text-2xl'
          >
            <GoX />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
