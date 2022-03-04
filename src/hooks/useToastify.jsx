import { useContext } from 'react';
import { ToastifyContext } from '../contexts/ToastifyProvider.jsx';

export const useToastify = () => useContext(ToastifyContext);
