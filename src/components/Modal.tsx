import React, { ReactNode } from 'react';
import { GoX } from 'react-icons/go';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}
// background: #45424B80;

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className='fixed  w-full h-full z-50 top-0 bottom-0 left-0 flex items-center justify-center'>
      <div
        onClick={onClose}
        className='bg-[#45424B80] w-full h-full absolute cursor-pointer'
      ></div>

      <div className='scrollBar w-[80%] h-[80%] shadow-xl relative bg-[--white-color] rounded-xl'>
        <div className='flex flex-col gap-5 p-5'>
          <button onClick={onClose} className='self-end text-xl'>
            <GoX />
          </button>

          {children}
        </div>
      </div>
    </div>
  );
}
