
import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/LanguageContext';
import { useToast } from '@/hooks/ToastContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, Send, ClipboardList, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/utils';
import { api } from '@/api';
interface Question {
    id: number;
    type: 'single' | 'multiple' | 'text';
    title: { zh: string; en: string };
    options?: { id: string; zh: string; en: string }[];
    required?: boolean;
}
const SURVEY_QUESTIONS: Question[] = [
    {
        id: 1,
        type: 'single',
        title: { zh: '1. 您对本次就诊的整体满意度如何？', en: '1. How satisfied are you with your overall visit?' },
        required: true,
        options: [
            { id: 'v_sat', zh: '非常满意', en: 'Very Satisfied' },
            { id: 'sat', zh: '满意', en: 'Satisfied' },
            { id: 'neutral', zh: '一般', en: 'Neutral' },
            { id: 'unsat', zh: '不满意', en: 'Unsatisfied' },
        ]
    },
    {
        id: 2,
        type: 'multiple',
        title: { zh: '2. 您在本院使用了哪些服务？（可多选）', en: '2. Which services did you use? (Multiple Choice)' },
        required: true,
        options: [
            { id: 'appt', zh: '预约挂号', en: 'Appointment' },
            { id: 'consult', zh: '专家咨询', en: 'Specialist Consultation' },
            { id: 'exam', zh: '检查检验', en: 'Examination/Testing' },
            { id: 'pharm', zh: '取药服务', en: 'Pharmacy' },
            { id: 'other', zh: '其他', en: 'Others' },
        ]
    },
    {
        id: 3,
        type: 'single',
        title: { zh: '3. 医护人员的沟通是否清晰易懂？', en: '3. Was the communication from medical staff clear and easy to understand?' },
        required: true,
        options: [
            { id: 'yes', zh: '是，非常清晰', en: 'Yes, very clear' },
            { id: 'mostly', zh: '基本清晰', en: 'Mostly clear' },
            { id: 'no', zh: '不清晰', en: 'Not clear' },
        ]
    },
    {
        id: 4,
        type: 'text',
        title: { zh: '4. 您对我们改进医疗服务有什么建议或意见？', en: '4. Do you have any suggestions or comments for improving our services?' },
        required: false,
    }
];

const SurveyPage: React.FC = () => {
    const { t, language } = useLanguage();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const MotionDiv = motion.div as any;

    const [answers, setAnswers] = useState<Record<number, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(()=>{
        console.log(123)
        const getSurvey = async () => {
            try {
                const data = await api.getSurvey({offset:1,limit:10});
                console.log(data);
            } catch (error) {
                console.error("Failed to load Survey", error);
            } finally {

            }
        };
        getSurvey()
    },[])

    const handleSingleSelect = (questionId: number, optionId: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionId }));
    };

    const handleMultiSelect = (questionId: number, optionId: string) => {
        const current = answers[questionId] || [];
        const next = current.includes(optionId)
            ? current.filter((id: string) => id !== optionId)
            : [...current, optionId];
        setAnswers(prev => ({ ...prev, [questionId]: next }));
    };

    const handleTextChange = (questionId: number, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check required fields
        const missingRequired = SURVEY_QUESTIONS.find(q =>
            q.required && (!answers[q.id] || (Array.isArray(answers[q.id]) && answers[q.id].length === 0))
        );

        if (missingRequired) {
            showToast(
                language === 'zh' ? '请完成必填题目' : 'Please complete all required questions',
                'error'
            );
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            showToast(
                language === 'zh' ? '感谢您的参与！' : 'Thank you for your participation!',
                'success'
            );
        }, 1500);

    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-50 pt-32 flex items-center justify-center px-4">
                <MotionDiv
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 shadow-2xl rounded-sm border-t-8 border-cuhk-secondary text-center max-w-lg w-full"
                >
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        {language === 'zh' ? '问卷提交成功' : 'Survey Submitted Successfully'}
                    </h2>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        {language === 'zh'
                            ? '您的反馈对我们非常重要，我们将不断努力提升医疗服务质量。'
                            : 'Your feedback is very important to us. We will continue to strive to improve the quality of medical services.'}
                    </p>
                    <button
                        onClick={() => navigate('/patient-services')}
                        className="bg-cuhk-primary text-white font-bold py-3 px-10 rounded-full hover:bg-cuhk-primary/90 transition-all shadow-lg flex items-center justify-center mx-auto"
                    >
                        <ChevronLeft size={18} className="mr-2" />
                        {t('feedback.back')}
                    </button>
                </MotionDiv>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <MotionDiv
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 text-center"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-cuhk-primary text-white rounded-full mb-4 shadow-lg">
                        <ClipboardList size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-3">{t('nav.sub.survey')}</h1>
                    <p className="text-gray-500 max-w-xl mx-auto italic">
                        {language === 'zh'
                            ? '通过这短短的问卷，帮助我们更好地了解您的需求。'
                            : 'Help us understand your needs better through this short survey.'}
                    </p>
                </MotionDiv>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {SURVEY_QUESTIONS.map((q, idx) => (
                        <MotionDiv
                            key={q.id}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-sm shadow-sm border border-gray-100"
                        >
                            <div className="flex items-start mb-6">
                                <h3 className="text-lg font-bold text-gray-800 leading-tight">
                                    {language === 'zh' ? q.title.zh : q.title.en}
                                    {q.required && <span className="text-red-500 ml-1">*</span>}
                                </h3>
                            </div>

                            {q.type === 'single' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {q.options?.map(opt => (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onClick={() => handleSingleSelect(q.id, opt.id)}
                                            className={cn(
                                                "flex items-center px-5 py-4 border-2 rounded-lg transition-all text-left font-medium",
                                                answers[q.id] === opt.id
                                                    ? "border-cuhk-primary bg-cuhk-primary/5 text-cuhk-primary shadow-sm"
                                                    : "border-gray-100 hover:border-gray-300 text-gray-600 bg-gray-50/30"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-colors",
                                                answers[q.id] === opt.id ? "border-cuhk-primary" : "border-gray-300"
                                            )}>
                                                {answers[q.id] === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-cuhk-primary" />}
                                            </div>
                                            {language === 'zh' ? opt.zh : opt.en}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {q.type === 'multiple' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {q.options?.map(opt => {
                                        const isSelected = (answers[q.id] || []).includes(opt.id);
                                        return (
                                            <button
                                                key={opt.id}
                                                type="button"
                                                onClick={() => handleMultiSelect(q.id, opt.id)}
                                                className={cn(
                                                    "flex items-center px-5 py-4 border-2 rounded-lg transition-all text-left font-medium",
                                                    isSelected
                                                        ? "border-cuhk-secondary bg-cuhk-secondary/5 text-cuhk-secondary shadow-sm"
                                                        : "border-gray-100 hover:border-gray-300 text-gray-600 bg-gray-50/30"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-5 h-5 rounded border-2 mr-4 flex items-center justify-center transition-colors",
                                                    isSelected ? "border-cuhk-secondary bg-cuhk-secondary" : "border-gray-300 bg-white"
                                                )}>
                                                    {isSelected && <CheckCircle2 size={14} className="text-white" />}
                                                </div>
                                                {language === 'zh' ? opt.zh : opt.en}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {q.type === 'text' && (
                                <textarea
                                    value={answers[q.id] || ''}
                                    onChange={(e) => handleTextChange(q.id, e.target.value)}
                                    placeholder={language === 'zh' ? "请在此输入您的反馈..." : "Enter your feedback here..."}
                                    className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-1 focus:ring-cuhk-primary outline-none transition-all resize-none bg-gray-50/30"
                                />
                            )}
                        </MotionDiv>
                    ))}

                    <div className="flex flex-col items-center justify-center pt-8 border-t border-gray-200">
                        <div className="flex items-center text-gray-400 text-sm mb-6">
                            <AlertCircle size={14} className="mr-2" />
                            {language === 'zh' ? '请确认所有必填项已填写' : 'Please ensure all required fields are filled'}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                                "min-w-[280px] bg-cuhk-primary text-white font-bold py-4 px-12 rounded-full shadow-xl transition-all flex items-center justify-center space-x-3 transform hover:scale-105 active:scale-95",
                                isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-cuhk-primary/90"
                            )}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    <span>{language === 'zh' ? '提交中...' : 'Submitting...'}</span>
                                </>
                            ) : (
                                <>
                                    <Send size={20} />
                                    <span>{language === 'zh' ? '提交问卷' : 'Submit Survey'}</span>
                                </>
                            )}
                        </button>

                        {!isSubmitting && (
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="mt-6 text-gray-400 hover:text-cuhk-primary font-bold text-sm transition-colors"
                            >
                                {language === 'zh' ? '取消返回' : 'Cancel and Return'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SurveyPage;
