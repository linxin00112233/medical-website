import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { NEWS_ITEMS, EVENTS } from '../assets/constants';
import { ArrowRight, Calendar } from 'lucide-react';

const NewsSection: React.FC = () => {
  return (
    <section id="news" className="py-20 bg-cuhk-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatedSection className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b border-gray-300 pb-4">
          <div>
            <span className="text-cuhk-secondary font-bold uppercase tracking-widest text-sm">Updates</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-cuhk-primary mt-2">News & Events</h2>
          </div>
          <a href="#" className="hidden md:flex items-center text-cuhk-primary hover:text-cuhk-secondary transition-colors font-medium mt-4 md:mt-0 group">
            View All News 
            <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-xl font-bold text-cuhk-dark mb-6">Latest News</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {NEWS_ITEMS.map((item, index) => (
                <AnimatedSection key={item.id} delay={index * 0.1}>
                  <div className="group cursor-pointer bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-4 left-4 bg-cuhk-secondary text-white text-xs font-bold px-2 py-1 uppercase">
                        {item.category}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-gray-400 text-xs mb-2 flex items-center">
                        <Calendar size={12} className="mr-1"/> {item.date}
                      </div>
                      <h4 className="text-lg font-bold text-cuhk-dark group-hover:text-cuhk-primary transition-colors mb-3 line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                        {item.summary}
                      </p>
                      <span className="text-cuhk-secondary text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">
                        Read More <ArrowRight size={14} className="ml-1" />
                      </span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-cuhk-dark mb-6">Upcoming Events</h3>
            <div className="bg-white p-6 shadow-sm border-t-4 border-cuhk-primary">
              <div className="space-y-6">
                {EVENTS.map((event, index) => (
                  <AnimatedSection key={event.id} delay={0.2 + (index * 0.1)} className="group cursor-pointer">
                    <div className="flex items-start space-x-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex-shrink-0 w-16 text-center border border-gray-200 rounded p-1 group-hover:border-cuhk-secondary transition-colors">
                        <div className="text-2xl font-bold text-cuhk-primary group-hover:text-cuhk-secondary transition-colors">{event.day}</div>
                        <div className="text-xs font-bold text-gray-500 uppercase">{event.month}</div>
                      </div>
                      <div>
                        <h5 className="font-bold text-cuhk-dark hover:text-cuhk-primary transition-colors text-sm mb-1">
                          {event.title}
                        </h5>
                        <p className="text-xs text-gray-500 flex items-center">
                           📍 {event.location}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
              <div className="mt-6 pt-4 text-center border-t border-gray-100">
                <a href="#" className="inline-block text-sm font-bold text-cuhk-primary hover:text-cuhk-secondary uppercase tracking-wider">
                  View All Events
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsSection;