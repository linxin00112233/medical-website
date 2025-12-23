import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cuhk-dark text-white pt-20 pb-10 border-t-8 border-cuhk-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <div className="mb-4">
              <h2 className="text-2xl font-serif font-bold text-white">School of Medicine</h2>
              <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">The Chinese University of Hong Kong, Shenzhen</p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transforming lives through medical education, innovative research, and compassionate care.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-cuhk-secondary transition-colors">
                  <Icon size={18} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-cuhk-secondary">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white hover:translate-x-1 inline-block transition-transform">About Us</Link></li>
              <li><Link to="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Governance</Link></li>
              <li><Link to="/faculty" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Faculty Recruitment</Link></li>
              <li><Link to="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Library</Link></li>
              <li><Link to="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Giving</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-cuhk-secondary">Admissions</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/admissions" className="hover:text-white">Undergraduate Programs</Link></li>
              <li><Link to="/admissions" className="hover:text-white">Postgraduate Programs</Link></li>
              <li><Link to="/admissions" className="hover:text-white">International Students</Link></li>
              <li><Link to="/admissions" className="hover:text-white">Student Life</Link></li>
              <li><Link to="/admissions" className="hover:text-white">Scholarships</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-cuhk-secondary">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 text-cuhk-secondary flex-shrink-0" />
                <span>2001 Longxiang Blvd., Longgang District, Shenzhen, China</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-cuhk-secondary flex-shrink-0" />
                <span>(86) 755-8427 3000</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-cuhk-secondary flex-shrink-0" />
                <span>med@cuhk.edu.cn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} School of Medicine, CUHK-Shenzhen. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;