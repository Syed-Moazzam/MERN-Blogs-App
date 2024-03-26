import { toast } from 'react-toastify';

const showToast = (status, message) => {
    if (status === 'success') {
        toast.info(message, {
            position: "top-right",
            autoClose: 3000,
        });
    }
    else if (status === 'error') {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
        });
    }
    else if (status === 'warning') {
        toast.warn(message, {
            position: "top-right",
            autoClose: 3000,
        });
    }
    else {
        toast.info(message, {
            position: "top-right",
            autoClose: 3000,
        });
    }
};

export default showToast;