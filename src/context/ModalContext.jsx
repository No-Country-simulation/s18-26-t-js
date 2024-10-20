'use client';

import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
  const [openModal, setOpenModal] = useState(false);

  ////////////////////////

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  ////////////////////////

  return (
    <ModalContext.Provider
      value={{ openModal, handleOpenModal, handleCloseModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useOpenModal() {
  const context = useContext(ModalContext);

  if (context === undefined)
    throw new Error('💥 ModalContext was used outside of the ModalProvider');

  return context;
}

export default ModalProvider;
