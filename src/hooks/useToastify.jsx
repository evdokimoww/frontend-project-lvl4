import { useContext } from 'react';
import { ToastifyContext } from '../contexts/ToastifyProvider.jsx';

const useToastify = () => useContext(ToastifyContext);
export default useToastify;
