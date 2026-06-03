import { officialMdesService } from './officialMdesService';
import type { NewsItem } from '../types/NewsItem';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const shouldUseOfficialSource = import.meta.env.VITE_USE_OFFICIAL_MDES !== 'false';

const fallbackNews: NewsItem[] = [
  {
    id: 'fallback-vianney-day-celebration',
    slug: 'vianney-day-celebration',
    title: 'Vianney Day Celebration',
    excerpt:
      'We had the Clergy – Religious Get-together on 4th August 2022, at Sathyanikethana (Cath..',
    content:
      'We had the Clergy – Religious Get-together on 4th August 2022, at Sathyanikethana. Read more for complete details from official MDES sources.',
    date: '2022-08-04',
    imageUrl: 'https://mdes.in/wp-content/uploads/2022/08/news_mdes_two.jpg',
    sourceUrl:
      'https://mdes.in/latest_news/there-are-many-variations-of-passages-of-lorem-ipsum-available/',
  },
  {
    id: 'fallback-hearty-welcome',
    slug: 'hearty-welcome',
    title: 'Hearty welcome',
    excerpt:
      "Diocese of Mysore Extends, Hearty welcome to Most Rev. Archbishop Leopoldo Girelli (Pope'..",
    content:
      "Diocese of Mysore extends hearty welcome to Most Rev. Archbishop Leopoldo Girelli. Read more for complete details from official MDES sources.",
    date: '2022-04-24',
    imageUrl: 'https://mdes.in/wp-content/uploads/2022/12/news_mdes_one.jpg',
    sourceUrl:
      'https://mdes.in/latest_news/contrary-to-popular-belief-lorem-ipsum-is-not-simply-random-text/',
  },
];

export const latestNewsService = {
  async getLatestNews(): Promise<NewsItem[]> {
    if (!shouldUseOfficialSource) {
      await wait(220);
      return fallbackNews;
    }

    try {
      const [officialNews] = await Promise.all([officialMdesService.getLatestNews(), wait(160)]);
      return officialNews.length ? officialNews : fallbackNews;
    } catch {
      await wait(220);
      return fallbackNews;
    }
  },
};
