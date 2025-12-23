import React from 'react';
import AnimatedSection from './ui/AnimatedSection';
import { ArrowRight } from 'lucide-react';

const programs = [
  { title: 'Clinical Medicine', desc: 'Developing competent and compassionate doctors.', img: 'https://picsum.photos/id/1060/600/400' },
  { title: 'Bioinformatics', desc: 'Bridging biology and data science.', img: 'https://picsum.photos/id/4/600/400' },
  { title: 'Pharmaceutical Science', desc: 'Innovating for future drug discovery.', img: 'https://picsum.photos/id/201/600/400' },
];

const AcademicSection: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedSection>
            <span className="text-cuhk-secondary font-bold uppercase tracking-widest text-sm">Academics</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-cuhk-primary mt-3 mb-6">World-Class Education</h2>
            <p className="text-gray-600 leading-relaxed">
              We offer a comprehensive curriculum that combines rigorous scientific training with clinical practice, preparing students for the challenges of modern medicine.
            </p>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((prog, index) => (
            <AnimatedSection key={index} delay={index * 0.15}>
              <div className="group relative overflow-hidden h-80 rounded-sm shadow-lg">
                <img 
                  src={prog.img} 
                  alt={prog.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-50"
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-serif font-bold text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {prog.title}
                  </h3>
                  <p className="text-gray-200 text-sm mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {prog.desc}
                  </p>
                  <a href="#" className="inline-flex items-center text-cuhk-secondary font-bold uppercase text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    Learn More <ArrowRight size={14} className="ml-2" />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicSection;