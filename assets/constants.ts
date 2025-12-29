import {  NewsItem, StatItem, EventItem ,ProgramItem,HerosSlidesItem} from '@/types';
import video from '@/images/video.mp4'
import img1 from '@/images/img1.jpg'
import img2 from '@/images/img2.jpg'

export const NAV_ITEMS = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.medical_overview', href: '/overview' },
  { key: 'nav.medical_services', href: '/services' },
  { key: 'nav.research_innovation', href: '/research' },
  { key: 'nav.education_training', href: '/education' },
  { key: 'nav.patient_guide', href: '/guide' },
  { key: 'nav.hospital_announcements', href: '/announcements' },
  { key: 'nav.party_mass', href: '/party' },
  { key: 'nav.recruitment', href: '/recruitment' },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    category: 'Research',
    date: '2023-10-24',
    title: 'Breakthrough in Neurology: New Study Published in Nature Medicine',
    summary: 'Prof. Zhang and his team have identified a new pathway for treating neurodegenerative diseases.',
    image: 'https://picsum.photos/id/1059/800/600',
  },
  {
    id: 2,
    category: 'Campus Life',
    date: '2023-10-20',
    title: 'White Coat Ceremony 2023 Welcomes New Medical Students',
    summary: 'Over 200 new students took their oath today, marking the beginning of their medical journey.',
    image: 'https://picsum.photos/id/1015/800/600',
  },
  {
    id: 3,
    category: 'Global',
    date: '2023-10-15',
    title: 'International Medical Symposium Held at CUHK-Shenzhen',
    summary: 'Experts from around the world gathered to discuss the future of robotic surgery.',
    image: 'https://picsum.photos/id/106/800/600',
  },
];

export const STATS: StatItem[] = [
  { id: 1, value: 6, suffix: '+', label: 'Departments' },
  { id: 2, value: 120, suffix: '+', label: 'Faculty Members' },
  { id: 3, value: 500, suffix: '+', label: 'Students' },
  { id: 4, value: 50, suffix: '+', label: 'Laboratories' },
];

export const EVENTS: EventItem[] = [
  { id: 1, day: '28', month: 'OCT', title: 'Distinguished Lecture Series: Prof. Li', location: 'Teaching Building A' },
  { id: 2, day: '05', month: 'NOV', title: 'Open Day 2023 for Prospective Students', location: 'Main Campus' },
  { id: 3, day: '12', month: 'NOV', title: 'Bio-Medical Innovation Forum', location: 'Conference Hall' },
];

export const PROGRAMS: ProgramItem[] = [
  {
    title: "Clinical Medicine",
    desc: "Developing competent and compassionate doctors.",
    img: "https://picsum.photos/id/1060/600/400",
  },
  {
    title: "Bioinformatics",
    desc: "Bridging biology and data science.",
    img: "https://picsum.photos/id/4/600/400",
  },
  {
    title: "Pharmaceutical Science",
    desc: "Innovating for future drug discovery.",
    img: "https://picsum.photos/id/201/600/400",
  },
];

export const HERO_SLIDES:HerosSlidesItem[]= [
  {
    id: 1,
    type: 'video',
    url: video,
    title: { prefix: '培养卓越', highlight: '医学', suffix: '领袖' },
    subtitle: '传承薪火，创新未来',
    description: '立足大湾区，致力于卓越的医学教育、生物医学研究和临床服务。'
  },
  {
    id: 2,
    type: 'image',
    url: img1,
    title: { prefix: '建设国际一流', highlight: '医学院', suffix: '校区' },
    subtitle: '博爱、诚信、卓越',
    description: '通过医学教育、创新研究和富有同情心的护理改变生活。'
  },
  {
    id: 3,
    type: 'image',
    url: img2,
    title: { prefix: '引领', highlight: '生物医学', suffix: '科研创新' },
    subtitle: '跨学科合作与突破',
    description: '整合全球资源，打造高水平生物医学研究平台。'
  }
];