import React, { createContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export const ToastifyContext = createContext({});

// eslint-disable-next-line react/prop-types
const ToastifyProvider = ({ children }) => {
  const successToast = (message) => toast.success(message);
  const errorToast = (message) => toast.error(message);

  return (
    <ToastifyContext.Provider value={{ successToast, errorToast }}>
      <ToastContainer />
      {children}
    </ToastifyContext.Provider>
  );
};

export default ToastifyProvider;
