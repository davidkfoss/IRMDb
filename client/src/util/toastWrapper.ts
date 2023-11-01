import toast from 'react-hot-toast';

const defaultOptions = { style: { background: '#333', color: '#fff' } };

const error = (message: string, options = defaultOptions) => toast.error(message, options);

const success = (message: string, options = defaultOptions) => toast.success(message, options);

const info = (message: string, options = defaultOptions) => toast(message, options);

const customToast = { error, success, info };

export default customToast;
