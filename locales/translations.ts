export const translations = {
  en: {
    "app.title": "School of Medicine, CUHK-Shenzhen",
    "header.university": "The Chinese University of Hong Kong, Shenzhen",
    "header.school": "School of Medicine",
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.education": "Education",
    "nav.research": "Research",
    "nav.faculty": "Faculty",
    "nav.admissions": "Admissions",
    "nav.news": "News & Events",
    "hero.subtitle": "Inheriting Tradition, Innovating Future",
    "hero.title.prefix": "Cultivating",
    "hero.title.highlight": "Medical",
    "hero.title.suffix": "Leaders",
    "hero.description":
      "Dedicated to excellence in education, research, and clinical care in the Greater Bay Area and beyond.",
    "hero.button": "Explore More",
    "hero.scroll": "Scroll",
    "footer.rights": "All Rights Reserved.",
  },
  zh: {
    "app.title": "香港中文大学（深圳）医学院",
    "header.university": "香港中文大学（深圳）",
    "header.school": "医学院",
    "nav.home": "首页",
    "nav.about": "关于我们",
    "nav.education": "教育教学",
    "nav.research": "科学研究",
    "nav.faculty": "师资队伍",
    "nav.admissions": "招生入学",
    "nav.news": "新闻动态",
    "hero.subtitle": "传承薪火，创新未来",
    "hero.title.prefix": "培养卓越",
    "hero.title.highlight": "医学",
    "hero.title.suffix": "领袖",
    "hero.description":
      "立足大湾区，致力于卓越的医学教育、生物医学研究和临床服务。",
    "hero.button": "探索更多",
    "hero.scroll": "滑动浏览",
    "footer.rights": "版权所有",
  },
};

export type Language = "en" | "zh";
export type TranslationKey = keyof typeof translations.en;
