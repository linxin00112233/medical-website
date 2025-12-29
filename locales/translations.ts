export const translations = {
  en: {
    "app.title": "School of Medicine, CUHK-Shenzhen",
    "header.university": "The Chinese University of Hong Kong, Shenzhen",
    "header.school": "School of Medicine",
    "nav.home": "Home",
    "nav.medical_overview": "Overview",
    "nav.medical_services": "Services",
    "nav.research_innovation": "Innovation",
    "nav.education_training": "Training",
    "nav.patient_guide": "Guide",
    "nav.hospital_announcements": "News",
    "nav.party_mass": "Party",
    "nav.recruitment": "Recruitment",
    "hero.subtitle": "Inheriting Tradition, Innovating Future",
    "hero.title.prefix": "Cultivating",
    "hero.title.highlight": "Medical",
    "hero.title.suffix": "Leaders",
    "hero.description": "Dedicated to excellence in education, research, and clinical care in the Greater Bay Area and beyond.",
    "hero.button": "Explore More",
    "hero.scroll": "Scroll",
    "footer.rights": "All Rights Reserved."
  },
  zh: {
    "app.title": "香港中文大学（深圳）医学院",
    "header.university": "香港中文大学（深圳）",
    "header.school": "医学院",
    "nav.home": "首页",
    "nav.medical_overview": "医疗概况",
    "nav.medical_services": "医疗服务",
    "nav.research_innovation": "科研创新",
    "nav.education_training": "教学培训",
    "nav.patient_guide": "就医指南",
    "nav.hospital_announcements": "医院公告",
    "nav.party_mass": "党群园地",
    "nav.recruitment": "人才招聘",
    "hero.subtitle": "传承薪火，创新未来",
    "hero.title.prefix": "培养卓越",
    "hero.title.highlight": "医学",
    "hero.title.suffix": "领袖",
    "hero.description": "立足大湾区，致力于卓越的医学教育、生物医学研究和临床服务。",
    "hero.button": "探索更多",
    "hero.scroll": "滑动浏览",
    "footer.rights": "版权所有"
  }
};

export type Language = 'en' | 'zh';
export type TranslationKey = keyof typeof translations.en;