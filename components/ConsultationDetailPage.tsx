
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/LanguageContext';
import { ChevronLeft, Send, CheckCircle2, UserCircle, Loader2 } from 'lucide-react';
import { ConsultationQuestion, ConsultationAnswer } from '@/types';
import { cn } from '@/utils';

const getMockQuestion = (id: string): ConsultationQuestion => ({
    id,
    content: "医生您好，家里老人被诊断为食道癌中期，现在吞咽困难非常严重，只能喝点流食，请问平时饮食要注意什么？吃什么药能缓解这个症状？服用食道平散会有帮助吗？",
    category: "内科",
    timestamp: "2023-10-24 14:30",
    answers: [
        {
            id: "a1",
            authorName: "张建国",
            authorAvatar: "https://i.pravatar.cc/150?u=doctor1",
            authorType: "doctor",
            title: "主任医师",
            department: "肿瘤内科",
            content: "您好。食道癌中期导致的吞咽困难主要是肿瘤压迫或堵塞食管腔引起的。饮食上建议以高蛋白、高热量的流食或半流食为主，避免辛辣、过硬、过烫的食物。关于食道平散，它是一种辅助性的中成药，具有活血化瘀、理气散结的作用，对部分患者的症状缓解有一定帮助，但不能替代常规的手术或放化疗方案。建议尽快带患者去医院进行营养评估，必要时可考虑支架植入或胃造瘘。",
            timestamp: "2023-10-24 15:45"
        },
        {
            id: "a2",
            authorName: "患者",
            authorAvatar: "https://i.pravatar.cc/150?u=patient_generic",
            authorType: "patient",
            content: "我家里人去年也是这个情况，喝流食的时候可以加点蛋白粉，还有就是少食多餐，不要一次喝太多，容易呛到。",
            timestamp: "2023-10-25 09:20"
        },
        {
            id: "a3",
            authorName: "李明学",
            authorAvatar: "https://i.pravatar.cc/150?u=doctor2",
            authorType: "doctor",
            title: "主治医师",
            department: "全科医学",
            content: "补充一点，由于吞咽困难，患者很容易出现脱水和电解质紊乱。如果饮水量不足，需要静脉补液。食道平散在服用期间要注意观察胃肠道反应。",
            timestamp: "2023-10-25 11:10"
        }
    ]
});

const ConsultationDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const [question, setQuestion] = useState<ConsultationQuestion | null>(null);
    const [loading, setLoading] = useState(true);
    const [reply, setReply] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const MotionDiv = motion.div as any;

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            if (id) {
                setQuestion(getMockQuestion(id));
            }
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [id]);

    const handleSubmitReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (!reply.trim()) return;

        setIsSubmitting(true);
        setTimeout(() => {
            const newAnswer: ConsultationAnswer = {
                id: Date.now().toString(),
                authorName: language === 'zh' ? '患者' : 'Patient',
                authorAvatar: "https://i.pravatar.cc/150?u=patient_generic",
                authorType: 'patient',
                content: reply,
                timestamp: new Date().toLocaleString()
            };

            setQuestion(prev => prev ? {
                ...prev,
                answers: [...prev.answers, newAnswer]
            } : null);

            setReply('');
            setIsSubmitting(false);
        }, 1000);
    };

    const handleBack = () => {
        // Navigating back via state if possible, else to base list
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/consultation');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-cuhk-primary animate-spin" />
            </div>
        );
    }

    if (!question) return null;

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-6 flex items-center">
                    <button
                        onClick={handleBack}
                        className="text-gray-400 hover:text-cuhk-primary transition-colors flex items-center group p-2 -ml-2 rounded-full hover:bg-gray-100"
                    >
                        <ChevronLeft size={24} className="mr-1 transform group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold">{t('consult.back')}</span>
                    </button>
                </div>

                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden mb-8"
                >
                    <div className="bg-cuhk-primary/5 px-6 py-4 border-b border-cuhk-primary/10 flex justify-between items-center">
                        <div className="flex items-center">
                <span className="bg-cuhk-primary text-white text-[10px] font-bold px-2 py-0.5 rounded mr-3 uppercase tracking-wider">
                  {t('consult.detail.question')}
                </span>
                            <span className="text-gray-400 text-xs">{question.timestamp}</span>
                        </div>
                        <span className="text-cuhk-primary font-bold text-xs">#{question.category}</span>
                    </div>
                    <div className="p-8">

                        <div className="bg-gray-50 p-6 rounded-sm border-l-4 border-cuhk-secondary">
                            <p className="text-gray-700 leading-relaxed italic">
                                "{question.content}"
                            </p>
                        </div>
                    </div>
                </MotionDiv>

                <div className="space-y-6">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center ml-2">
                        <div className="w-1 h-5 bg-cuhk-primary mr-3 rounded-full" />
                        {t('consult.detail.answers')}
                    </h2>

                    <AnimatePresence initial={false}>
                        {question.answers.map((answer, index) => (
                            <MotionDiv
                                key={answer.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={cn(
                                    "bg-white rounded-sm shadow-sm border overflow-hidden",
                                    answer.authorType === 'doctor' ? "border-cuhk-primary/20" : "border-gray-100"
                                )}
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="relative">
                                                <img
                                                    src={answer.authorAvatar}
                                                    alt={answer.authorName}
                                                    className={cn(
                                                        "w-12 h-12 rounded-full border-2 p-0.5",
                                                        answer.authorType === 'doctor' ? "border-cuhk-primary" : "border-gray-200"
                                                    )}
                                                />
                                                {answer.authorType === 'doctor' && (
                                                    <div className="absolute -bottom-1 -right-1 bg-cuhk-secondary text-white p-0.5 rounded-full ring-2 ring-white">
                                                        <CheckCircle2 size={10} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="flex items-center">
                                                    <h4 className="font-bold text-gray-800 mr-2">{answer.authorName}</h4>
                                                    <span className={cn(
                                                        "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter",
                                                        answer.authorType === 'doctor'
                                                            ? "bg-cuhk-primary text-white"
                                                            : "bg-gray-100 text-gray-400"
                                                    )}>
                            {answer.authorType === 'doctor' ? t('consult.detail.doctor_tag') : t('consult.detail.patient_tag')}
                          </span>
                                                </div>
                                                {answer.authorType === 'doctor' && (
                                                    <div className="flex items-center mt-0.5 space-x-2 text-xs font-medium">
                                                        {answer.title && <span className="text-cuhk-primary">{answer.title}</span>}
                                                        {answer.title && answer.department && <span className="text-gray-300">|</span>}
                                                        {answer.department && <span className="text-cuhk-secondary">{answer.department}</span>}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-gray-400 text-xs">{answer.timestamp}</span>
                                    </div>
                                    <div className="pl-0 md:pl-16">
                                        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                            {answer.content}
                                        </div>
                                    </div>
                                </div>
                            </MotionDiv>
                        ))}
                    </AnimatePresence>
                </div>

                <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-12 bg-white rounded-sm shadow-xl border border-gray-100 overflow-hidden"
                >
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center">
                        <UserCircle size={20} className="text-cuhk-primary mr-2" />
                        <span className="text-gray-700 font-bold text-sm">
              {language === 'zh' ? '发表您的建议' : 'Share your suggestion'}
            </span>
                    </div>
                    <form onSubmit={handleSubmitReply} className="p-6">
            <textarea
                required
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder={t('consult.detail.reply_placeholder')}
                className="w-full h-32 p-4 border border-gray-200 rounded-sm focus:ring-1 focus:ring-cuhk-primary focus:border-cuhk-primary outline-none transition-all resize-none"
            />
                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting || !reply.trim()}
                                className={cn(
                                    "flex items-center space-x-2 bg-cuhk-primary text-white font-bold py-3 px-8 rounded-full transition-all",
                                    (isSubmitting || !reply.trim()) ? "opacity-50 cursor-not-allowed" : "hover:bg-cuhk-primary/90 transform hover:scale-105 active:scale-95 shadow-lg"
                                )}
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>{t('consult.detail.submit_reply')}</span>
                                        <Send size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </MotionDiv>
            </div>
        </div>
    );
};

export default ConsultationDetailPage;
