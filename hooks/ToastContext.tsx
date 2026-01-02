
import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';

type ToastType = 'success' | 'error';

interface ToastContextType {
    showToast: (message: string, type: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const showToast = useCallback((message: string, type: ToastType, duration: number = 3000) => {
        if (type === 'success') {
            toast.success(message, { duration });
        } else {
            toast.error(message, { duration });
        }
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        padding: '16px',
                        borderRadius: '12px',
                        background: '#fff',
                        color: '#333',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                        fontWeight: 'bold',
                        fontSize: '15px',
                        border: '2px solid transparent'
                    },
                    success: {
                        style: {
                            borderColor: '#c1a065'
                        },
                        iconTheme: {
                            primary: '#c1a065',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        style: {
                            borderColor: '#ef4444'
                        },
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    }
                }}
            />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
