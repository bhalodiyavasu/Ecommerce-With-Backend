/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import './Toast.css';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const hideToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((variant, message) => {
    const newToast = {
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      variant,
      message,
    };

    setToasts((prev) => {
      const updatedToasts = [...prev, newToast];
      // Keep only the last 2 toasts (remove the oldest if there are more than 2)
      if (updatedToasts.length > 2) {
        return updatedToasts.slice(updatedToasts.length - 2);
      }
      return updatedToasts;
    });

    // Auto-hide after 3.5 seconds
    setTimeout(() => {
      hideToast(newToast.id);
    }, 3500);
  }, [hideToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="premium-toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`premium-toast-box toast-${toast.variant}`}>
            <div className="toast-noise-overlay"></div>
            <div className="toast-content">
              <span className="toast-message">{toast.message}</span>
              <button className="toast-close-btn" onClick={() => hideToast(toast.id)}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
