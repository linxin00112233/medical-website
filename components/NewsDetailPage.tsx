
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '@/api';
import { NewsArticleDetail } from '@/types';
import { useLanguage } from '@/hooks/LanguageContext';
import { Calendar, ChevronRight, Loader2, ArrowLeft } from 'lucide-react';

const { useParams, Link, useNavigate } = ReactRouterDOM as any;

const NewsDetailPage: React.FC = () => {
    // Fix: Removed generic type argument from useParams as it is typed as 'any'
    const { id } = useParams();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const MotionDiv = motion.div as any;

    const [article, setArticle] = useState<NewsArticleDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            if (id) {
                const data = await api.getNewsDetail(id);
                if (data) {
                    setArticle(data);
                }
            }
            setLoading(false);
        };
        fetchArticle();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white pt-32 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-cuhk-primary animate-spin" />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-white pt-32 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
                <button onClick={() => navigate('/news')} className="text-cuhk-primary hover:underline">
                    Back to News
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-28 pb-20">
            <div className="container mx-auto px-4 lg:px-24 max-w-5xl">

                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4">
                    <Link to="/" className="hover:text-cuhk-primary transition-colors">
                        {language === 'zh' ? '首页' : 'Home'}
                    </Link>
                    <ChevronRight size={14} className="mx-2" />
                    <Link to="/announcements/news" className="hover:text-cuhk-primary transition-colors">
                        {language === 'zh' ? '新闻速递' : 'News Express'}
                    </Link>
                    <ChevronRight size={14} className="mx-2" />
                    <span className="text-gray-800 font-medium truncate max-w-[200px]">
             {article.title}
           </span>
                </div>

                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Header */}
                    <header className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-cuhk-dark leading-tight mb-6">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 border-l-4 border-cuhk-secondary pl-4 py-1">
                            <div className="flex items-center space-x-6">
                <span className="flex items-center">
                  <Calendar size={16} className="mr-2 text-cuhk-primary" />
                    {article.time}
                </span>
                                <span className="hidden md:inline-block">
                  {language === 'zh' ? '来源：医院传媒中心' : 'Source: MED Communications'}
                </span>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {article.picurl && (
                        <div className="mb-10 rounded-sm overflow-hidden shadow-lg">
                            <img src={article.picurl} alt={article.title} className="w-full h-auto object-cover" />
                        </div>
                    )}

                    {/* Content Body */}
                    <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        {/*
              Injecting HTML content strictly as requested.
              In a real app, ensure this is sanitized (e.g., using DOMPurify).
            */}
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    </article>

                    {/* Footer Navigation */}
                    <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between">
                        <button
                            onClick={() => navigate('/news')}
                            className="flex items-center text-cuhk-primary font-bold hover:underline"
                        >
                            <ArrowLeft size={18} className="mr-2" />
                            {language === 'zh' ? '返回列表' : 'Back to List'}
                        </button>
                    </div>
                </MotionDiv>
            </div>
        </div>
    );
};

export default NewsDetailPage;
