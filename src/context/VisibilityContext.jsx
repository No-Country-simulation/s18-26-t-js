'use client';

import { createContext, useContext, useState } from 'react';

const VisibilityContext = createContext();

function VisibilityProvider({ children }) {
  const [visibleComponents, setVisibleComponents] = useState({});
  const [componentData, setComponentData] = useState({});

  ////////////////////////

  function handleShow(componentId) {
    setVisibleComponents((prevState) => ({
      ...prevState,
      [componentId]: true,
    }));
  }

  function handleHide(componentId) {
    setVisibleComponents((prevState) => ({
      ...prevState,
      [componentId]: false,
    }));
  }

  function isComponentVisible(componentId) {
    return !!visibleComponents[componentId];
  }

  // -----

  function handleData(componentId, data) {
    setComponentData((prevState) => ({
      ...prevState,
      [componentId]: data,
    }));
  }

  function getComponentData(componentId) {
    return componentData[componentId] || null;
  }

  ////////////////////////

  return (
    <VisibilityContext.Provider
      value={{
        handleShow,
        handleHide,
        isComponentVisible,
        handleData,
        getComponentData,
      }}
    >
      {children}
    </VisibilityContext.Provider>
  );
}

export function useVisibility() {
  const context = useContext(VisibilityContext);

  if (context === undefined)
    throw new Error(
      '💥 useVisibility must be used within a VisibilityProvider',
    );

  return context;
}

export default VisibilityProvider;

/*
'use client';

import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

function ModalProvider({ children }) {
  const [modals, setModals] = useState({});
  const [data, setData] = useState([]);

  ////////////////////////

  function handleData(data) {
    setData(data);
  }

  function handleOpenModal(modalId) {
    setModals((prevState) => ({ ...prevState, [modalId]: true }));
  }

  function handleCloseModal(modalId) {
    setModals((prevState) => ({ ...prevState, [modalId]: false }));
  }

  function isModalOpen(modalId) {
    return !!modals[modalId];
  }

  ////////////////////////

  return (
    <ModalContext.Provider
      value={{
        handleOpenModal,
        handleCloseModal,
        isModalOpen,
        handleData,
        data,
      }}
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

export default ModalProvider;*/

/*

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

export function useVisibility() {
  const context = useContext(ModalContext);

  if (context === undefined)
    throw new Error('💥 ModalContext was used outside of the ModalProvider');

  return context;
}


*/
