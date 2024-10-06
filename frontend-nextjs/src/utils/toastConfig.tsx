import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

interface ToastProps {
  message: string;
  type?: 'default' | 'info' | 'success' | 'warning' | 'error' ;
}
export const showCustomToast = ({message, type = 'default'}: ToastProps) => {
  toast[type](message, toastConfig);
};