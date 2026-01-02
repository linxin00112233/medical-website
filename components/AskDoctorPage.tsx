import React, {  useState} from 'react';
import { motion} from 'framer-motion';
import {useLanguage} from '@/hooks/LanguageContext';
import {ArrowLeft, CheckCircle2, ChevronLeft, Info} from 'lucide-react';
import {useNavigate} from 'react-router-dom';

const AskDoctorPage: React.FC = () => {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const MotionDiv = motion.div as any;

    const [form, setForm] = useState({
        symptoms: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            navigate('/consultation');
        }, 3000);
    };

    // Using navigate(-1) is generally more robust for "Back" buttons
    const handleBack = () => {
        navigate(-1);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-50 pt-32 pb-20 flex items-center justify-center px-4">
                <MotionDiv
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-10 rounded-sm shadow-xl border border-gray-100 text-center max-w-md w-full"
                >
                    <CheckCircle2 size={64} className="text-cuhk-secondary mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {language === 'zh' ? '提交成功' : 'Submitted Successfully'}
                    </h2>
                    <p className="text-gray-500 mb-8">
                        {language === 'zh' ? '您的咨询已提交，医生将尽快回复。' : 'Your consultation has been submitted. The doctor will reply soon.'}
                    </p>
                    <button
                        onClick={() => navigate('/consultation')}
                        className="w-full bg-cuhk-primary text-white font-bold py-3 rounded-full hover:bg-cuhk-primary/90 transition-all flex items-center justify-center space-x-2 shadow-lg"
                    >
                        <ArrowLeft size={18} />
                        <span>{language === 'zh' ? '返回列表' : 'Back to List'}</span>
                    </button>
                    <div className="mt-8 w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                        <MotionDiv
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 3, ease: "linear" }}
                            className="h-full bg-cuhk-primary"
                        />
                    </div>
                </MotionDiv>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-8 flex items-center">
                    <button
                        onClick={handleBack}
                        className="text-gray-400 hover:text-cuhk-primary transition-colors flex items-center mr-4 p-2 -ml-2 rounded-full hover:bg-gray-100"
                    >
                        <ChevronLeft size={28} />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">{t('ask.title')}</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-cuhk-primary/5 px-6 py-4 border-b border-cuhk-primary/10">
                            <h2 className="text-cuhk-primary font-bold flex items-center">
                                <Info size={18} className="mr-2" />
                                {t('ask.module.disease')}
                            </h2>
                        </div>
                        <div className="p-8 space-y-6">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">
                                    * 1. {t('ask.symptoms')}:
                                </label>
                                <textarea
                                    required
                                    value={form.symptoms}
                                    onChange={e => setForm({...form, symptoms: e.target.value})}
                                    className="w-full h-32 p-4 border border-gray-200 rounded-sm focus:ring-1 focus:ring-cuhk-primary focus:border-cuhk-primary outline-none transition-all"
                                    placeholder={language === 'zh' ? "例如：胃痛三天，昨晚开始发烧..." : "e.g. Stomach pain for 3 days, fever started last night..."}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center pt-4">
                        <p className="text-gray-400 text-sm mb-6">{t('ask.required_hint')}</p>
                        <button
                            type="submit"
                            className="bg-cuhk-primary hover:bg-cuhk-primary/90 text-white font-bold py-4 px-16 rounded-full shadow-xl transition-all transform hover:scale-105 active:scale-95"
                        >
                            {t('ask.submit')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AskDoctorPage;
