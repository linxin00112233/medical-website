import { apiService } from "./request";
import { wait } from '@/utils';
import { NewsArticleDetail } from '@/types';
// 模拟富文本内容生成
const generateRichText = (title: string) => `
  <div class="news-content">
    <p class="lead"><strong>Shenzhen, China</strong> — ${title} has marked a significant milestone for the School of Medicine at CUHK-Shenzhen.</p>
    <p>In a recent development that highlights the university's commitment to excellence, faculty members and students gathered to celebrate this achievement. The event underscored the importance of integrating clinical practice with cutting-edge research.</p>
    <figure style="margin: 2rem 0;">
      <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200" alt="Medical Research" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);" />
      <figcaption style="text-align: center; color: #666; font-size: 0.9rem; margin-top: 0.5rem;">The research team discussing new findings.</figcaption>
    </figure>
    <h3>Key Highlights</h3>
    <ul>
      <li>Innovative approaches to medical education.</li>
      <li>Strategic partnerships with global healthcare institutions.</li>
      <li>Advanced laboratory facilities now fully operational.</li>
    </ul>
    <p>Professor Li, a leading expert in the field, stated: "This is just the beginning. Our vision is to cultivate medical leaders who are not only skilled practitioners but also compassionate caregivers."</p>
    <p>The ceremony concluded with a tour of the new facilities, demonstrating the state-of-the-art equipment available for student training.</p>
  </div>
`;

// 基础模板数据
const BASE_TEMPLATES: NewsArticleDetail[] = [
  {
    id: 101,
    category: 'academic',
    title: '诺贝尔奖得主受聘我不医学院杰出教授',
    time: '2023-11-15',
    picurl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    content: generateRichText('Nobel Laureate Joins Faculty'),
    summary: '这是医学院全球人才引进战略的重要一步，标志着我院在生物医学研究领域迈向新高度。'
  },
  {
    id: 102,
    category: 'academic',
    title: '医学院在《Nature Medicine》发表重磅神经科学研究成果',
    time: '2023-11-10',
    picurl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800',
    content: generateRichText('Breakthrough in Neuroscience Published in Nature Medicine'),
    summary: '研究团队发现了阿尔茨海默病的新型致病机制，为药物研发提供了全新靶点。'
  },
  {
    id: 201,
    category: 'campus',
    title: '2023级白大褂授予仪式隆重举行',
    time: '2023-10-28',
    picurl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    content: generateRichText('White Coat Ceremony 2023'),
    summary: '医学生们庄严宣誓，正式踏上医学求知之路，传承“博文约礼”的校训精神。'
  },
  {
    id: 202,
    category: 'campus',
    title: '医学院举办首届“生命之光”医学人文艺术展',
    time: '2023-10-15',
    picurl: 'https://images.unsplash.com/photo-1544534802-936636a38bc5?auto=format&fit=crop&q=80&w=800',
    content: generateRichText('Life Light Medical Arts Exhibition'),
    summary: '通过艺术作品展现医学的温度，探讨生命、疾病与疗愈的深刻内涵。'
  },
  {
    id: 301,
    category: 'events',
    title: '大湾区生物医药创新论坛圆满落幕',
    time: '2023-09-20',
    picurl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80&w=800',
    content: generateRichText('GBA Bio-Medical Innovation Forum'),
    summary: '汇聚全球顶尖专家，共话大湾区生物医药产业的未来发展机遇与挑战。'
  },
  {
    id: 302,
    category: 'events',
    title: '医学院开放日：近千名高中生走进医学殿堂',
    time: '2023-09-05',
    picurl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    content: generateRichText('Medical School Open Day'),
    summary: '通过模拟手术体验、标本馆参观等活动，激发青少年对医学的兴趣。'
  },
  {
    id: 401,
    category: 'academic',
    title: '国际合作新篇章：与哈佛医学院签署合作备忘录',
    time: '2023-08-15',
    picurl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    content: generateRichText('MoU Signed with Harvard Medical School'),
    summary: '双方将在学生交换、联合科研及师资培训等方面开展深度合作。'
  },
  {
    id: 402,
    category: 'campus',
    title: '“医路有你”暑期社会实践队出征仪式',
    time: '2023-07-10',
    picurl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800',
    content: generateRichText('Summer Social Practice Departure'),
    summary: '10支实践队伍将奔赴全国各地，开展医疗义诊、健康科普等志愿服务活动。'
  },
  {
    id: 403,
    category: 'events',
    title: '2023年诺贝尔生理学或医学奖解读讲座',
    time: '2023-10-08',
    picurl: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&q=80&w=800',
    content: generateRichText('Nobel Prize Interpretation Lecture'),
    summary: '特邀专家深度解析mRNA疫苗技术的突破性贡献及其临床应用前景。'
  }];
// 生成更多数据以支持分页演示
const generateLargeDataset = () => {
  const dataset: NewsArticleDetail[] = [];
  // 复制 6 次，产生约 54+ 条数据
  for (let i = 0; i < 60; i++) {
    const template = BASE_TEMPLATES[i % BASE_TEMPLATES.length];
    // 随机生成一些日期变化
    const month = 11 - Math.floor(i / 10);
    const day = 28 - (i % 25);

    dataset.push({
      ...template,
      id: 1000 + i, // 确保 ID 唯一
      // 标题加后缀以示区别
      title: i < BASE_TEMPLATES.length ? template.title : `${template.title} (Archived ${Math.floor(i / BASE_TEMPLATES.length)})`,
      time: `2023-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    });
  }
  return dataset;
};
const FULL_NEWS_DB = generateLargeDataset();
export const api = {
  getHeroSlides: async () => {
    return apiService.get("/api/hero-slides");
  },
  getSurvey: async (data:{offset:number,limit:number})=>{
    return apiService.get("/api/survey", data);
  },
  getArticleList: async (data:{offset:number,limit:number})=>{
    return apiService.get("/api/article", data);
  },
  /**
   * 获取新闻速递列表 (模拟接口)
   * @param category 分类ID，为空则返回全部
   * @param page
   * @param pageSize
   */
  getNewsExpressList: async (category?: string, page: number = 1, pageSize: number = 9): Promise<NewsArticleDetail[]> => {
    await wait(600); // 模拟网络耗时

    let filtered = FULL_NEWS_DB;
    if (category && category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }

    // 分页逻辑
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return filtered.slice(start, end);
  },

  /**
   * 获取新闻详情
   */
  getNewsDetail: async (id: string | number): Promise<NewsArticleDetail | undefined> => {
    await wait(400);
    return FULL_NEWS_DB.find(item => item.id == id);
  }
};
