
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/LanguageContext';
import { useToast } from '@/hooks/ToastContext';
import { User, Smartphone, CheckCircle2, ArrowLeft, Loader2, CreditCard, Mail, MapPin, Type, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils';

const FeedbackPage: React.FC = () => {
    const { t, language } = useLanguage();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const MotionDiv = motion.div as any;

    const [form, setForm] = useState({
        name: '',
        idNumber: '',
        phone: '',
        email: '',
        address: '',
        title: '',
        content: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation for phone number (only if provided)
        if (form.phone.trim() && !/^\d+$/.test(form.phone.replace(/\s/g, ''))) {
            showToast(language === 'zh' ? '请输入有效的手机号码' : 'Please enter a valid phone number', 'error', 2500);
            return;
        }

        // Basic validation for ID number (only if provided)
        if (language === 'zh' && form.idNumber.trim() && !/^[0-9xX]{15,18}$/.test(form.idNumber)) {
            showToast('请输入有效的身份证号', 'error', 2500);
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);

            showToast(t('feedback.success'), 'success', 4000);

        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-white pt-32 flex items-center justify-center px-4">
                <MotionDiv
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md w-full"
                >
                    <div className="w-20 h-20 bg-cuhk-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-cuhk-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('feedback.success')}</h2>
                    <p className="text-gray-500 mb-8">
                        {language === 'zh' ? '我们将尽快核实并处理您的反馈' : 'We will verify and process your feedback soon.'}
                    </p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-cuhk-primary font-bold hover:underline flex items-center justify-center mx-auto px-6 py-2 rounded-full hover:bg-cuhk-primary/5 transition-all"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        {t('feedback.back')}
                    </button>
                </MotionDiv>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <MotionDiv
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {t('feedback.title')}
                    </h1>
                    <div className="w-12 h-1 bg-cuhk-secondary mx-auto rounded-full" />
                </MotionDiv>

                <div className="bg-white p-8 md:p-12 shadow-xl border border-gray-100 rounded-sm">
                    <div className="border border-dashed border-cuhk-secondary/30 bg-cuhk-secondary/5 p-8 text-center mb-12 rounded-sm">
                        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-[15px]">
                            {t('feedback.intro')}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* User Name - Optional */}
                            <div className="space-y-2">
                                <label className="block text-gray-700 font-bold text-[14px]">
                                    {t('feedback.name')}
                                </label>
                                <div className="flex border border-gray-200 rounded-sm focus-within:border-cuhk-primary transition-all overflow-hidden bg-gray-50/30">
                                    <div className="px-3 flex items-center justify-center border-r border-gray-100">
                                        <User size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        disabled={isSubmitting}
                                        value={form.name}
                                        onChange={e => setForm({...form, name: e.target.value})}
                                        className="flex-1 py-3 px-4 outline-none bg-transparent"
                                        placeholder={language === 'zh' ? '请输入您的姓名（选填）' : 'Enter your name (optional)'}
                                    />
                                </div>
                            </div>

                            {/* ID Number - Optional */}
                            <div className="space-y-2">
                                <label className="block text-gray-700 font-bold text-[14px]">
                                    {t('feedback.id_number')}
                                </label>
                                <div className="flex border border-gray-200 rounded-sm focus-within:border-cuhk-primary transition-all overflow-hidden bg-gray-50/30">
                                    <div className="px-3 flex items-center justify-center border-r border-gray-100">
                                        <CreditCard size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        disabled={isSubmitting}
                                        value={form.idNumber}
                                        onChange={e => setForm({...form, idNumber: e.target.value})}
                                        className="flex-1 py-3 px-4 outline-none bg-transparent"
                                        placeholder={language === 'zh' ? '请输入证件号码（选填）' : 'Enter ID number (optional)'}
                                    />
                                </div>
                            </div>

                            {/* Phone Number - Optional */}
                            <div className="space-y-2">
                                <label className="block text-gray-700 font-bold text-[14px]">
                                    {t('feedback.phone')}
                                </label>
                                <div className="flex border border-gray-200 rounded-sm focus-within:border-cuhk-primary transition-all overflow-hidden bg-gray-50/30">
                                    <div className="px-3 flex items-center justify-center border-r border-gray-100">
                                        <Smartphone size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        disabled={isSubmitting}
                                        value={form.phone}
                                        onChange={e => setForm({...form, phone: e.target.value})}
                                        className="flex-1 py-3 px-4 outline-none bg-transparent"
                                        placeholder={language === 'zh' ? '请输入联系电话（选填）' : 'Enter phone number (optional)'}
                                    />
                                </div>
                            </div>

                            {/* Email Address - Optional */}
                            <div className="space-y-2">
                                <label className="block text-gray-700 font-bold text-[14px]">
                                    {t('feedback.email')}
                                </label>
                                <div className="flex border border-gray-200 rounded-sm focus-within:border-cuhk-primary transition-all overflow-hidden bg-gray-50/30">
                                    <div className="px-3 flex items-center justify-center border-r border-gray-100">
                                        <Mail size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        disabled={isSubmitting}
                                        value={form.email}
                                        onChange={e => setForm({...form, email: e.target.value})}
                                        className="flex-1 py-3 px-4 outline-none bg-transparent"
                                        placeholder={language === 'zh' ? '请输入电子邮箱（选填）' : 'Enter email (optional)'}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address - Optional */}
                        <div className="space-y-2">
                            <label className="block text-gray-700 font-bold text-[14px]">
                                {t('feedback.address')}
                            </label>
                            <div className="flex border border-gray-200 rounded-sm focus-within:border-cuhk-primary transition-all overflow-hidden bg-gray-50/30">
                                <div className="px-3 flex items-center justify-center border-r border-gray-100">
                                    <MapPin size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    disabled={isSubmitting}
                                    value={form.address}
                                    onChange={e => setForm({...form, address: e.target.value})}
                                    className="flex-1 py-3 px-4 outline-none bg-transparent"
                                    placeholder={language === 'zh' ? '请输入详细联系地址（选填）' : 'Enter contact address (optional)'}
                                />
                            </div>
                        </div>

                        {/* Complaint Title - Mandatory */}
                        <div className="space-y-2">
                            <label className="block text-gray-700 font-bold text-[14px]">
                                <span className="text-red-500 mr-1">*</span>{t('feedback.complaint_title')}
                            </label>
                            <div className="flex border border-gray-200 rounded-sm focus-within:border-cuhk-primary transition-all overflow-hidden bg-gray-50/30">
                                <div className="px-3 flex items-center justify-center border-r border-gray-100">
                                    <Type size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    disabled={isSubmitting}
                                    value={form.title}
                                    onChange={e => setForm({...form, title: e.target.value})}
                                    className="flex-1 py-3 px-4 outline-none bg-transparent font-bold"
                                    placeholder={language === 'zh' ? '请简要概括反馈主题' : 'Briefly summarize your feedback'}
                                />
                            </div>
                        </div>

                        {/* Complaint Content - Mandatory */}
                        <div className="space-y-2">
                            <label className="block text-gray-800 font-bold text-[14px]">
                                <span className="text-red-500 mr-1">*</span>{t('feedback.complaint_content')}
                            </label>
                            <div className="relative border border-gray-200 rounded-sm focus-within:border-cuhk-primary transition-all bg-gray-50/30 p-2">
                                <div className="flex items-start mb-2 opacity-30 px-2 pt-2">
                                    <FileText size={18} className="text-gray-400" />
                                </div>
                                <textarea
                                    required
                                    disabled={isSubmitting}
                                    value={form.content}
                                    onChange={e => setForm({...form, content: e.target.value})}
                                    className="w-full h-40 px-4 py-2 bg-transparent outline-none transition-all resize-none disabled:text-gray-400"
                                    placeholder={language === 'zh' ? '请详细描述您遇到的问题或建议...' : 'Describe your feedback or suggestions in detail...'}
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col items-center justify-center pt-8 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn(
                                    "min-w-[240px] text-white font-bold py-4 px-12 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 text-[15px] flex items-center justify-center space-x-2",
                                    isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-cuhk-primary hover:bg-cuhk-primary/90"
                                )}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        <span>{language === 'zh' ? '正在提交...' : 'Submitting...'}</span>
                                    </>
                                ) : (
                                    <span>{t('feedback.submit')}</span>
                                )}
                            </button>
                            {!isSubmitting && (
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="mt-4 text-gray-400 hover:text-cuhk-primary font-bold text-sm transition-colors"
                                >
                                    {language === 'zh' ? '放弃填写并返回' : 'Discard and Go Back'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-xs italic">
                        {language === 'zh' ? '* 我们将对您的个人隐私信息严格保密' : '* Your personal information will be kept strictly confidential.'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeedbackPage;
