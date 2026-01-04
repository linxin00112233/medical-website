
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/LanguageContext';
import { api } from '@/api';
import { NewsArticleDetail } from '@/types';
import { Calendar, ChevronRight, ArrowRight, Loader2, Search } from 'lucide-react';
import * as ReactRouterDOM from 'react-router-dom';
import { cn } from '@/utils';

const { Link } = ReactRouterDOM as any;

// 分类配置
const CATEGORIES = [
    { id: 'all', zh: '全部新闻', en: 'All News' },
    { id: 'academic', zh: '学术科研', en: 'Academics' },
    { id: 'campus', zh: '校园生活', en: 'Campus Life' },
    { id: 'events', zh: '学术活动', en: 'Events' },
];

const PAGE_SIZE = 9;

const NewsExpressPage: React.FC = () => {
    const { language } = useLanguage();
    const MotionDiv = motion.div as any;
    const MotionButton = motion.button as any;

    const [activeCategory, setActiveCategory] = useState('all');
    const [newsList, setNewsList] = useState<NewsArticleDetail[]>([]);

    // 分页状态
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true); // 初始加载
    const [isLoadingMore, setIsLoadingMore] = useState(false); // 加载更多
    const [hasMore, setHasMore] = useState(true); // 是否还有更多数据

    const observerTarget = useRef<HTMLDivElement>(null);

    // 初始化加载或切换分类时重置
    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            setPage(1);
            setHasMore(true);
            setNewsList([]); // 清空列表，避免显示旧数据

            try {
                const data = await api.getNewsExpressList(activeCategory, 1, PAGE_SIZE);
                setNewsList(data);
                if (data.length < PAGE_SIZE) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Failed to load news", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, [activeCategory]);

    // 加载更多数据
    const loadMore = useCallback(async () => {
        if (isLoadingMore || !hasMore) return;

        setIsLoadingMore(true);
        const nextPage = page + 1;

        try {
            const data = await api.getNewsExpressList(activeCategory, nextPage, PAGE_SIZE);
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setNewsList(prev => [...prev, ...data]);
                setPage(nextPage);
                if (data.length < PAGE_SIZE) {
                    setHasMore(false);
                }
            }
        } catch (error) {
            console.error("Failed to load more news", error);
        } finally {
            setIsLoadingMore(false);
        }
    }, [activeCategory, page, hasMore, isLoadingMore]);

    // 监听滚动到底部
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading && !isLoadingMore) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [loadMore, hasMore, loading, isLoadingMore]);

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-24">
            <div className="container mx-auto px-4 lg:px-20">

                {/* Breadcrumbs & Header */}
                <div className="mb-12">
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                        <Link to="/" className="hover:text-cuhk-primary transition-colors">
                            {language === 'zh' ? '首页' : 'Home'}
                        </Link>
                        <ChevronRight size={14} className="mx-2" />
                        <span className="text-gray-900 font-medium">
                {language === 'zh' ? '新闻速递' : 'News Express'}
              </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-8 gap-6">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4 relative inline-block">
                                {language === 'zh' ? '新闻速递' : 'News Express'}
                                <MotionDiv
                                    initial={{ width: 0 }}
                                    animate={{ width: '40%' }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="absolute -bottom-4 left-0 h-1.5 bg-cuhk-primary rounded-full"
                                />
                            </h1>
                            <p className="text-gray-500 mt-4 max-w-2xl text-lg">
                                {language === 'zh'
                                    ? '关注医学院最新动态，探索前沿科研成果与丰富校园生活。'
                                    : 'Stay updated with the latest news, research breakthroughs, and campus stories from the School of Medicine.'}
                            </p>
                        </div>

                        {/* Optional Search Input - visual only for now */}
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder={language === 'zh' ? '搜索新闻...' : 'Search news...'}
                                className="pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-full text-sm focus:outline-none focus:border-cuhk-primary focus:ring-1 focus:ring-cuhk-primary w-full md:w-64 transition-all"
                            />
                            <Search size={18} className="absolute left-3.5 top-2.5 text-gray-400 group-focus-within:text-cuhk-primary transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="mb-12 flex flex-wrap gap-3">
                    {CATEGORIES.map((cat) => (
                        <MotionButton
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-bold transition-all border",
                                activeCategory === cat.id
                                    ? "bg-cuhk-primary border-cuhk-primary text-white shadow-md"
                                    : "bg-white border-gray-200 text-gray-600 hover:border-cuhk-primary hover:text-cuhk-primary"
                            )}
                        >
                            {language === 'zh' ? cat.zh : cat.en}
                        </MotionButton>
                    ))}
                </div>

                {/* News Grid */}
                {loading ? (
                    <div className="flex justify-center py-32">
                        <Loader2 className="w-12 h-12 text-cuhk-primary animate-spin" />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence mode="popLayout">
                                {newsList.map((item, index) => (
                                    <MotionDiv
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index % PAGE_SIZE * 0.05, duration: 0.4 }}
                                    >
                                        <Link
                                            to={`/announcements/news/${item.id}`}
                                            className="group flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                                        >
                                            {/* Image Container */}
                                            <div className="relative h-56 overflow-hidden">
                                                <div className="absolute top-4 left-4 z-10">
                          <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-cuhk-primary text-xs font-bold rounded-md shadow-sm uppercase tracking-wider">
                            {CATEGORIES.find(c => c.id === item.category)?.en || item.category}
                          </span>
                                                </div>
                                                <img
                                                    src={item.picurl}
                                                    alt={item.title}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 p-6 flex flex-col">
                                                <div className="flex items-center text-gray-400 text-xs font-medium mb-3">
                                                    <Calendar size={14} className="mr-1.5 text-cuhk-secondary" />
                                                    {item.time}
                                                </div>

                                                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-cuhk-primary transition-colors">
                                                    {item.title}
                                                </h2>

                                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                                                    {item.summary || item.content.replace(/<[^>]+>/g, '').slice(0, 100) + '...'}
                                                </p>

                                                <div className="pt-4 border-t border-gray-50 flex items-center text-cuhk-primary font-bold text-sm uppercase tracking-wider">
                          <span className="mr-2 group-hover:mr-3 transition-all">
                            {language === 'zh' ? '阅读详情' : 'Read Article'}
                          </span>
                                                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </Link>
                                    </MotionDiv>
                                ))}
                            </AnimatePresence>
                        </div>

                        {newsList.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                                <p className="text-gray-400 text-lg">
                                    {language === 'zh' ? '暂无相关新闻' : 'No news found in this category.'}
                                </p>
                                <button
                                    onClick={() => setActiveCategory('all')}
                                    className="mt-4 text-cuhk-primary font-bold hover:underline"
                                >
                                    {language === 'zh' ? '查看全部' : 'View All'}
                                </button>
                            </div>
                        )}

                        {/* Loading More Sentinel & Spinner */}
                        <div ref={observerTarget} className="py-12 flex justify-center w-full">
                            {isLoadingMore && (
                                <div className="flex items-center space-x-2 text-cuhk-primary/60">
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    <span className="text-sm font-bold uppercase tracking-widest">{language === 'zh' ? '加载更多...' : 'Loading More...'}</span>
                                </div>
                            )}
                            {!hasMore && newsList.length > 0 && (
                                <div className="flex items-center space-x-4 text-gray-300 w-full justify-center">
                                    <div className="h-px w-20 bg-gray-200" />
                                    <span className="text-xs uppercase tracking-widest">{language === 'zh' ? '已显示全部内容' : 'End of Content'}</span>
                                    <div className="h-px w-20 bg-gray-200" />
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default NewsExpressPage;
