//类型定义文件
export interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  category: string;
  summary: string;
}

export interface StatItem {
  id: number;
  value: number;
  suffix: string;
  label: string;
}

export interface EventItem {
  id: number;
  day: string;
  month: string;
  title: string;
  location: string;
}

export interface ProgramItem {
  title: string;
  desc: string;
  img: string;
}
