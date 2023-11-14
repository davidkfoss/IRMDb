import toast, { ToastOptions } from 'react-hot-toast';

/**
 * Default options for toast messages.
 */
const defaultOptions = { style: { background: '#333', color: '#fff' } };

/**
 * Displays an error toast message.
 * @param message - The message to display in the toast.
 * @param options - Optional toast options.
 */
const error = (message: string, options?: ToastOptions) => toast.error(message, { ...options, ...defaultOptions });

/**
 * Displays a success toast message.
 * @param message - The message to display.
 * @param options - (Optional) Additional options for the toast.
 */
const success = (message: string, options?: ToastOptions) => toast.success(message, { ...options, ...defaultOptions });

/**
 * Displays an info toast message with the given message and options.
 * @param message The message to display in the toast.
 * @param options Optional toast options to override the default options.
 */
const info = (message: string, options?: ToastOptions) => toast(message, { ...options, ...defaultOptions });

/**
 * Object containing functions for displaying custom toast messages.
 * @property {Function} error - Function for displaying an error toast message.
 * @property {Function} success - Function for displaying a success toast message.
 * @property {Function} info - Function for displaying an info toast message.
 */
const customToast = { error, success, info };

export default customToast;
