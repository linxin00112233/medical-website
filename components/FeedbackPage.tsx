
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/LanguageContext';
import { User, Smartphone } from 'lucide-react';
import {useToast} from "@/hooks/ToastContext.tsx";

const FeedbackPage: React.FC = () => {
    const { t,  } = useLanguage();
    const { showToast } = useToast();

    const [form, setForm] = useState({
        content: '',
        name: '',
        phone: '',
        email: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // After 3 seconds, navigate back to home or services
        showToast(t('feedback.success'), 'success', 4000);
        setForm({
            content: '',
            name: '',
            phone: '',
            email: ''
        })
    };

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-12">
                    {t('feedback.title')}
                </h1>

                <div className="border border-dashed border-gray-200 bg-gray-50/50 p-10 text-center mb-12">
                    <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-lg">
                        {t('feedback.intro')}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl mx-auto">
                    {/* Content */}
                    <div className="space-y-4">
                        <label className="block text-gray-800 font-bold text-lg">
                            <span className="text-red-500 mr-1">*</span>
                            1、{t('feedback.content')}
                        </label>
                        <div className="relative">
              <textarea
                  required
                  value={form.content}
                  onChange={e => setForm({...form, content: e.target.value})}
                  className="w-full h-30 p-4 border border-gray-200 rounded-sm focus:border-cuhk-primary outline-none transition-all resize-none shadow-sm"
              />
                        </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-4">
                        <label className="block text-gray-800 font-bold text-lg">
                            2、{t('feedback.name')}
                        </label>
                        <div className="flex border border-gray-200 rounded-sm focus-within:border-cuhk-primary transition-all overflow-hidden shadow-sm">
                            <div className="bg-gray-50 px-4 flex items-center justify-center border-r border-gray-200">
                                <User size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={form.name}
                                onChange={e => setForm({...form, name: e.target.value})}
                                className="flex-1 py-4 px-4 outline-none"
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-4">
                        <label className="block text-gray-800 font-bold text-lg">
                            3、{t('feedback.phone')}
                        </label>
                        <div className="flex border border-gray-200 rounded-sm focus-within:border-cuhk-primary transition-all overflow-hidden shadow-sm">
                            <div className="bg-gray-50 px-4 flex items-center justify-center border-r border-gray-200">
                                <Smartphone size={20} className="text-gray-400" />
                            </div>
                            <input
                                type="tel"
                                value={form.phone}
                                onChange={e => setForm({...form, phone: e.target.value})}
                                className="flex-1 py-4 px-4 outline-none"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-4">
                        <label className="block text-gray-800 font-bold text-lg">
                            4、{t('feedback.email')}
                        </label>
                        <div className="flex border border-gray-200 rounded-sm focus-within:border-cuhk-primary transition-all overflow-hidden shadow-sm">
                            <div className="bg-gray-50 px-4 flex items-center justify-center border-r border-gray-200 text-gray-400 font-bold text-lg">
                                @
                            </div>
                            <input
                                type="email"
                                value={form.email}
                                onChange={e => setForm({...form, email: e.target.value})}
                                className="flex-1 py-4 px-4 outline-none"
                            />
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center justify-center pt-10">
                        <button
                            type="submit"
                            className="min-w-[280px] bg-cuhk-primary hover:bg-cuhk-primary/90 text-white font-bold py-4 px-12 rounded-full shadow-[0_8px_20px_rgba(117,14,109,0.3)] transition-all transform hover:scale-105 active:scale-95 text-lg"
                        >
                            {t('ask.submit')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackPage;
