import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (type, message) => {
    switch (type) {
        case 'user-connected':
        case 'user-disconnected':
            toast(message);
            break;
        case 'error':
            toast.error(message,{
                autoClose: 1000,
                closeOnClick: false,
                progressClassName: "bg-red-400",
            });
            break;
        case 'success':
            toast.success(message);
            break;
        default:
            toast(message);
    }
}

const Toast = () => {

    return (
        <ToastContainer
            autoClose={1500}
            closeButton={false} 
            newestOnTop
            draggable={false}
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            theme={"dark"}
            progressClassName={"bg-cyan-400"}
            toastClassName={"bg-stone-900 float-right whitespace-nowrap"}
        />
    );
}

export { Toast, showToast };