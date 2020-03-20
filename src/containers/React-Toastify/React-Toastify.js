import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// const style = {
//     position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
// }

export const ToastifyError = (message,callback) => {
    toast.error(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: callback
    },);
}

export const ToastifySuccess = (message,callback) => {
    toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: callback
    });
}