import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) { 
  const [toasts, setToasts] = React.useState([
    {
      id: crypto.randomUUID(),
      message: 'An error has occurred.',
      variant: 'error'
    },
    {
      id: crypto.randomUUID(),
      message: 'Logged in',
      variant: 'success'
    },
    {
      id: crypto.randomUUID(),
      message: 'Warning, don\'t do that!',
      variant: 'warning'
    },
    {
      id: crypto.randomUUID(),
      message: 'You have popped the toast.',
      variant: 'notice'
    }
  ]);

  /**
   * Clear all toast messages
   */
  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        setToasts([])
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  function createToast(message, variant) {
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant
      }
    ];

    setToasts(nextToasts);
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToasts);
  }

  return (
      <ToastContext.Provider
      value={{ toasts, createToast, dismissToast }}
      >
        {children}
      </ToastContext.Provider>
  )
}

export default ToastProvider;
