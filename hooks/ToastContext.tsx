
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { cn } from '@/utils';

type ToastType = 'success' | 'error';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto remove after 3.5 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3500);
    }, []);

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    // Safe cast for the environment
    const MotionDiv = motion.div as any;

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Container - Fixed to top center, ensures children don't collapse */}
            <div className="fixed top-24 left-0 right-0 z-[10000] flex flex-col items-center pointer-events-none px-4">
                <div className="flex flex-col space-y-4 items-center w-full max-w-sm">
                    <AnimatePresence>
                        {toasts.map((toast) => (
                            <MotionDiv
                                key={toast.id}
                                // Simpler animation to avoid "stuck at 0 height" issues
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className={cn(
                                    "pointer-events-auto w-full min-h-[56px] flex items-center justify-between p-4 rounded-xl shadow-2xl border transition-colors",
                                    toast.type === 'success'
                                        ? "bg-white border-cuhk-secondary/40 text-gray-800"
                                        : "bg-red-50 border-red-200 text-red-800"
                                )}
                            >
                                <div className="flex items-center space-x-3 flex-1 overflow-hidden">
                                    <div className={cn(
                                        "p-1.5 rounded-full shrink-0",
                                        toast.type === 'success' ? "bg-cuhk-secondary/10" : "bg-red-100"
                                    )}>
                                        {toast.type === 'success' ? (
                                            <CheckCircle2 size={18} className="text-cuhk-secondary" />
                                        ) : (
                                            <AlertCircle size={18} className="text-red-500" />
                                        )}
                                    </div>
                                    <p className="text-sm font-bold tracking-tight leading-tight truncate">
                                        {toast.message}
                                    </p>
                                </div>

                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="ml-3 p-1 rounded-full hover:bg-black/5 transition-colors shrink-0"
                                    aria-label="Close notification"
                                >
                                    <X size={16} className="opacity-40" />
                                </button>
                            </MotionDiv>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
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
