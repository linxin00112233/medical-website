
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/LanguageContext';
import { ChevronRight, MessageCircle, Heart, Search } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { cn } from '@/utils';

const DEPARTMENTS = [
    { id: 'internal', zh: '内科', en: 'Internal Medicine' },
    { id: 'surgery', zh: '外科', en: 'Surgery' },
    { id: 'andrology', zh: '男科', en: 'Andrology' },
    { id: 'gynecology', zh: '妇产科', en: 'Gynecology' },
    { id: 'pediatrics', zh: '儿科', en: 'Pediatrics' },
    { id: 'tcm', zh: '中医', en: 'TCM' },
    { id: 'oncology', zh: '肿瘤', en: 'Oncology' },
    { id: 'sexual', zh: '两性', en: 'Sexuality' },
    { id: 'orthopedics', zh: '骨科', en: 'Orthopedics' },
    { id: 'ent', zh: '五官科', en: 'ENT' },
    { id: 'infectious', zh: '传染科', en: 'Infectious' },
];

const MOCK_QUESTIONS = {
    internal: [
        { id: '1', text: "患有中期食道癌进食困难吃什么..." },
        { id: '2', text: "服用食道平散对食道癌起什么效果" },
        { id: '3', text: "得了食道癌吃不下饭吃什么药能好点" },
        { id: '4', text: "食道癌晚期术后吃食道平散还有..." },
        { id: '5', text: "服用食道平散对食道癌真的有效吗" },
        { id: '6', text: "用什么药治食道癌晚期吃不下饭最好" },
        { id: '7', text: "患有食道癌中期吞咽困难用什么..." },
        { id: '8', text: "到了食道癌中期吞咽困难可以吃..." },
        { id: '9', text: "食道平散适合食道癌术后患者吃..." },
        { id: '10', text: "患有晚期食道癌能吃食道平散吗..." }
    ],
    surgery: [
        { id: '11', text: "阑尾炎手术后多久可以恢复运动？" },
        { id: '12', text: "微创胆囊切除术有哪些注意事项？" },
        { id: '13', text: "下肢静脉曲张手术后会复发吗？" },
        { id: '14', text: "腰椎间盘突出手术风险大吗？" },
        { id: '15', text: "腹股沟疝气手术前需要做哪些准备？" }
    ]
};

const ConsultationPage: React.FC = () => {
    const { t, language } = useLanguage();
    const [searchParams, setSearchParams] = useSearchParams();

    // Get active department from URL or default to 'internal'
    const activeDept = searchParams.get('dept') || 'internal';

    const setActiveDept = (id: string) => {
        setSearchParams({ dept: id });
    };

    const MotionDiv = motion.div as any;
    const currentQuestions = MOCK_QUESTIONS[activeDept as keyof typeof MOCK_QUESTIONS] || MOCK_QUESTIONS.internal;

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20">
            <div className="container mx-auto px-4 lg:px-12">
                {/* Header Section */}
                <MotionDiv
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-sm shadow-sm border-b border-gray-100"
                >
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <div className="w-12 h-12 bg-cuhk-primary rounded-full flex items-center justify-center text-white">
                            <MessageCircle size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">{t('consult.title')}</h1>
                            <p className="text-gray-500 text-sm flex items-center">
                                <Heart size={14} className="mr-1 text-red-500" />
                                {t('consult.total_helped').replace('{count}', '3915839')}
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/ask-doctor"
                        className="bg-cuhk-secondary hover:bg-cuhk-secondary/90 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105"
                    >
                        {t('consult.free_btn')}
                    </Link>
                </MotionDiv>

                {/* Main Content Card */}
                <div className="bg-white rounded-sm shadow-md overflow-hidden border border-gray-100">

                    {/* Tabs Navigation */}
                    <div className="flex flex-wrap border-b border-gray-200 bg-gray-50/50">
                        {DEPARTMENTS.map((dept) => (
                            <button
                                key={dept.id}
                                onClick={() => setActiveDept(dept.id)}
                                className={cn(
                                    "px-6 py-4 text-sm font-bold transition-all relative group",
                                    activeDept === dept.id
                                        ? "text-cuhk-primary bg-white"
                                        : "text-gray-500 hover:text-cuhk-primary hover:bg-gray-100"
                                )}
                            >
                                {language === 'zh' ? dept.zh : dept.en}
                                {activeDept === dept.id && (
                                    <MotionDiv
                                        layoutId="deptTab"
                                        className="absolute top-0 left-0 right-0 h-1 bg-cuhk-primary"
                                    />
                                )}
                            </button>
                        ))}
                        <button className="px-6 py-4 text-sm font-bold text-gray-400 hover:text-cuhk-primary transition-colors flex items-center ml-auto">
                            {language === 'zh' ? '更多' : 'More'} <ChevronRight size={14} className="ml-1" />
                        </button>
                    </div>

                    {/* Question List */}
                    <div className="p-8 min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <MotionDiv
                                key={activeDept}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6"
                            >
                                {currentQuestions.map((q) => (
                                    <Link
                                        to={`/consultation/${q.id}`}
                                        key={q.id}
                                        className="flex justify-between items-center group cursor-pointer border-b border-gray-50 pb-4 hover:bg-gray-50/50 px-2 transition-colors rounded"
                                    >
                    <span className="text-gray-700 text-[15px] group-hover:text-cuhk-primary truncate flex-1">
                      {q.text}
                    </span>
                                        <span className="text-gray-400 text-sm ml-4 whitespace-nowrap">
                      {t('consult.replied')}
                    </span>
                                    </Link>
                                ))}
                            </MotionDiv>
                        </AnimatePresence>

                        {/* Bottom Actions */}
                        <div className="mt-12 flex justify-center">
                            <button className="text-cuhk-primary hover:text-cuhk-secondary font-bold flex items-center space-x-2 transition-colors">
                                <span>{t('consult.view_all')}</span>
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Bar Secondary Area */}
                <div className="mt-8 bg-cuhk-primary/5 p-8 rounded-sm border border-cuhk-primary/10 flex flex-col items-center">
                    <h3 className="text-cuhk-primary font-bold mb-4">{language === 'zh' ? '搜索您的健康疑问' : 'Search Your Health Concerns'}</h3>
                    <div className="relative w-full max-w-2xl">
                        <input
                            type="text"
                            placeholder={language === 'zh' ? "搜索疾病、症状或医生" : "Search disease, symptoms or doctors"}
                            className="w-full py-4 pl-6 pr-16 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cuhk-primary/20 shadow-sm"
                        />
                        <button className="absolute right-2 top-2 bottom-2 bg-cuhk-primary text-white p-3 rounded-full hover:bg-cuhk-primary/90 transition-colors">
                            <Search size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultationPage;
