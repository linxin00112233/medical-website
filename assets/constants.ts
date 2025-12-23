import { NewsItem, StatItem, EventItem, ProgramItem } from "@/types/index";

export const NAV_ITEMS = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/about" },
  { key: "nav.education", href: "/education" },
  { key: "nav.research", href: "/research" },
  { key: "nav.faculty", href: "/faculty" },
  { key: "nav.admissions", href: "/admissions" },
  { key: "nav.news", href: "/news" },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    category: "Research",
    date: "2023-10-24",
    title: "Breakthrough in Neurology: New Study Published in Nature Medicine",
    summary:
      "Prof. Zhang and his team have identified a new pathway for treating neurodegenerative diseases.",
    image: "https://picsum.photos/id/1059/800/600",
  },
  {
    id: 2,
    category: "Campus Life",
    date: "2023-10-20",
    title: "White Coat Ceremony 2023 Welcomes New Medical Students",
    summary:
      "Over 200 new students took their oath today, marking the beginning of their medical journey.",
    image: "https://picsum.photos/id/1015/800/600",
  },
  {
    id: 3,
    category: "Global",
    date: "2023-10-15",
    title: "International Medical Symposium Held at CUHK-Shenzhen",
    summary:
      "Experts from around the world gathered to discuss the future of robotic surgery.",
    image: "https://picsum.photos/id/106/800/600",
  },
];

export const STATS: StatItem[] = [
  { id: 1, value: 6, suffix: "+", label: "Departments" },
  { id: 2, value: 120, suffix: "+", label: "Faculty Members" },
  { id: 3, value: 500, suffix: "+", label: "Students" },
  { id: 4, value: 50, suffix: "+", label: "Laboratories" },
];

export const EVENTS: EventItem[] = [
  {
    id: 1,
    day: "28",
    month: "OCT",
    title: "Distinguished Lecture Series: Prof. Li",
    location: "Teaching Building A",
  },
  {
    id: 2,
    day: "05",
    month: "NOV",
    title: "Open Day 2023 for Prospective Students",
    location: "Main Campus",
  },
  {
    id: 3,
    day: "12",
    month: "NOV",
    title: "Bio-Medical Innovation Forum",
    location: "Conference Hall",
  },
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
