import type { CouncilMember } from '../types/CouncilMember';
import type { Career } from '../types/Career';
import type { Institution } from '../types/Institution';
import type { NewsItem } from '../types/NewsItem';
import { toTitleCase } from '../utils/formatters';

const OFFICIAL_SITE_URL = 'https://mdes.in';
const OFFICIAL_API_BASE = `${OFFICIAL_SITE_URL}/wp-json/wp/v2`;
const REQUEST_TIMEOUT_MS = 4500;
const DEFAULT_OFFICIAL_BANNER_URL = `${OFFICIAL_SITE_URL}/wp-content/uploads/2022/12/MDS-banner-1.jpg`;
const LOCAL_BANNER_URL = '/mdes-assets/banner.jpg';
const LOCAL_SITEMAP_URLS = {
  posts: '/mdes-cache/sitemaps/wp-sitemap-posts-post-1.xml',
  pages: '/mdes-cache/sitemaps/wp-sitemap-posts-page-1.xml',
  latestNews: '/mdes-cache/sitemaps/wp-sitemap-posts-latest_news-1.xml',
  frontBanners: '/mdes-cache/sitemaps/wp-sitemap-posts-front_banners-1.xml',
  frontGallery: '/mdes-cache/sitemaps/wp-sitemap-posts-front_gallery-1.xml',
  careers: '/mdes-cache/sitemaps/wp-sitemap-posts-careers-1.xml',
  upcomingEvent: '/mdes-cache/sitemaps/wp-sitemap-posts-upcoming_event-1.xml',
  governingCouncil: '/mdes-cache/sitemaps/wp-sitemap-posts-governing_council-1.xml',
  scrollingNews: '/mdes-cache/sitemaps/wp-sitemap-posts-scrolling_news-1.xml',
  categories: '/mdes-cache/sitemaps/wp-sitemap-taxonomies-category-1.xml',
} as const;
const THEME_IMAGE_URLS = {
  president: '/mdes-assets/President.jpg',
  vicePresident: '/mdes-assets/Vice_President.jpg',
  secretary: '/mdes-assets/Secretary.jpg',
  treasurer: '/mdes-assets/treasurer.jpg',
} as const;

const SITEMAP_URLS = {
  posts: `${OFFICIAL_SITE_URL}/wp-sitemap-posts-post-1.xml`,
  pages: `${OFFICIAL_SITE_URL}/wp-sitemap-posts-page-1.xml`,
  latestNews: `${OFFICIAL_SITE_URL}/wp-sitemap-posts-latest_news-1.xml`,
  frontBanners: `${OFFICIAL_SITE_URL}/wp-sitemap-posts-front_banners-1.xml`,
  frontGallery: `${OFFICIAL_SITE_URL}/wp-sitemap-posts-front_gallery-1.xml`,
  careers: `${OFFICIAL_SITE_URL}/wp-sitemap-posts-careers-1.xml`,
  upcomingEvent: `${OFFICIAL_SITE_URL}/wp-sitemap-posts-upcoming_event-1.xml`,
  governingCouncil: `${OFFICIAL_SITE_URL}/wp-sitemap-posts-governing_council-1.xml`,
  scrollingNews: `${OFFICIAL_SITE_URL}/wp-sitemap-posts-scrolling_news-1.xml`,
  categories: `${OFFICIAL_SITE_URL}/wp-sitemap-taxonomies-category-1.xml`,
} as const;

type WpPage = {
  id: number;
  slug: string;
  link: string;
  title: {
    rendered: string;
  };
};

type WpMedia = {
  id: number;
  post?: number | null;
  title?: {
    rendered: string;
  };
  mime_type?: string;
  source_url: string;
};

type WpCouncilPost = {
  id: number;
  title: {
    rendered: string;
  };
  featured_media: number;
};

type WpCareerPost = {
  id: number;
  slug: string;
  link: string;
  title: {
    rendered: string;
  };
};

type WpLatestNewsPost = {
  id: number;
  slug: string;
  link: string;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_media: number;
};

const districtBySlug: Record<string, string> = {
  mysuru: 'Mysuru',
  mandya: 'Mandya',
  kodagu: 'Kodagu',
  chamarajanagar: 'Chamarajanagar',
  hassan: 'Hassan',
};

const createTimeoutController = () => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  return { controller, timeoutId };
};

const fetchJson = async <T>(url: string): Promise<T> => {
  const { controller, timeoutId } = createTimeoutController();

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return (await response.json()) as T;
  } finally {
    window.clearTimeout(timeoutId);
  }
};

const fetchSitemapUrls = async (url: string, localUrl?: string): Promise<string[]> => {
  const parseSitemap = (xml: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
    const locations = Array.from(doc.getElementsByTagName('loc'));
    return locations.map((node) => node.textContent?.trim() ?? '').filter(Boolean);
  };

  if (localUrl) {
    try {
      const localResponse = await fetch(localUrl);
      if (localResponse.ok) {
        return parseSitemap(await localResponse.text());
      }
    } catch {
      // Fall through to remote request.
    }
  }

  const { controller, timeoutId } = createTimeoutController();

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Sitemap request failed with status ${response.status}`);
    }

    return parseSitemap(await response.text());
  } finally {
    window.clearTimeout(timeoutId);
  }
};

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').trim();

const councilPhotoFallbackFromText = (value: string) => {
  const lowered = value.toLowerCase();
  if (lowered.includes('president') || lowered.includes('bernard')) return THEME_IMAGE_URLS.president;
  if (lowered.includes('vice') || lowered.includes('mendonca')) return THEME_IMAGE_URLS.vicePresident;
  if (lowered.includes('secretary') || lowered.includes('saldanha')) return THEME_IMAGE_URLS.secretary;
  if (lowered.includes('treasurer') || lowered.includes('naveen')) return THEME_IMAGE_URLS.treasurer;
  return undefined;
};

const slugFromUrl = (value: string) => {
  try {
    const pathname = new URL(value).pathname;
    const segments = pathname.split('/').filter(Boolean);
    return segments.at(-1) ?? '';
  } catch {
    return '';
  }
};

const readableFromSlug = (slug: string) =>
  toTitleCase(slug.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim() || 'Item');

const districtFromSlug = (slug: string) => {
  const matchedKey = Object.keys(districtBySlug).find((district) => slug.includes(district));
  return matchedKey ? districtBySlug[matchedKey] : 'Mysuru';
};

const mapCategory = (value: string) => (value.toLowerCase().includes('college') ? 'College' : 'School');

const toInstitution = (page: WpPage): Institution => {
  const title = stripHtml(page.title.rendered) || 'MDES Institution';
  const district = districtFromSlug(page.slug);

  return {
    id: `official-${page.slug}`,
    name: title,
    district,
    category: mapCategory(title),
    address: `MDES ${district} Institutions Directory`,
    phone: 'Refer official contact page',
    email: 'info@mdes.in',
    website: page.link,
    principal: 'Refer institution office',
    admissionContact: 'Refer official admissions contact',
  };
};

const toInstitutionFromSitemapUrl = (url: string): Institution => {
  const slug = slugFromUrl(url);
  const name = readableFromSlug(slug);
  const district = districtFromSlug(slug);

  return {
    id: `official-sitemap-${slug || 'institution'}`,
    name,
    district,
    category: mapCategory(name),
    address: `MDES ${district} Institutions Directory`,
    phone: 'Refer official contact page',
    email: 'info@mdes.in',
    website: url,
    principal: 'Refer institution office',
    admissionContact: 'Refer official admissions contact',
  };
};

const toCouncilMember = (
  post: WpCouncilPost,
  mediaById: Map<number, WpMedia>,
): CouncilMember => {
  const title = stripHtml(post.title.rendered) || 'MDES Council Member';
  const media = mediaById.get(post.featured_media);

  return {
    id: `official-council-${post.id}`,
    name: title,
    designation: 'Member',
    phone: 'Refer official contact page',
    email: 'info@mdes.in',
    photoUrl: media?.source_url,
  };
};

const toCouncilMemberFromAttachment = (media: WpMedia): CouncilMember => {
  const title = stripHtml(media.title?.rendered ?? '') || 'MDES Council Member';
  const fallbackPhotoUrl = councilPhotoFallbackFromText(title);

  return {
    id: `official-council-media-${media.id}`,
    name: title,
    designation: 'Member',
    phone: 'Refer official contact page',
    email: 'info@mdes.in',
    photoUrl: media.source_url || fallbackPhotoUrl,
  };
};

const toCouncilMemberFromSitemapUrl = (url: string, index: number): CouncilMember => {
  const slug = slugFromUrl(url);
  const fallbackPhotoUrl = councilPhotoFallbackFromText(slug);

  return {
    id: `official-sitemap-council-${slug || index}`,
    name: readableFromSlug(slug),
    designation: 'Member',
    phone: 'Refer official contact page',
    email: 'info@mdes.in',
    photoUrl: fallbackPhotoUrl,
  };
};

const toCareer = (post: WpCareerPost): Career => {
  const title = stripHtml(post.title.rendered) || readableFromSlug(post.slug);

  return {
    id: `official-career-${post.id}`,
    title,
    location: 'MDES Institutions',
    type: 'Full-Time',
    description: 'Refer official MDES careers page for full role details and eligibility.',
    applyUrl: post.link,
  };
};

const toCareerFromSitemapUrl = (url: string, index: number): Career => {
  const slug = slugFromUrl(url);

  return {
    id: `official-sitemap-career-${slug || index}`,
    title: readableFromSlug(slug),
    location: 'MDES Institutions',
    type: 'Full-Time',
    description: 'Refer official MDES careers page for full role details and eligibility.',
    applyUrl: url,
  };
};

const toNewsItem = (post: WpLatestNewsPost, mediaById: Map<number, WpMedia>): NewsItem => {
  const title = stripHtml(post.title.rendered) || readableFromSlug(post.slug);
  const excerpt = stripHtml(post.excerpt.rendered) || 'Read more for details.';
  const content = stripHtml(post.content.rendered) || excerpt;
  const imageUrl = mediaById.get(post.featured_media)?.source_url;

  return {
    id: `official-news-${post.id}`,
    slug: post.slug,
    title,
    excerpt,
    content,
    date: post.date,
    imageUrl,
    sourceUrl: post.link,
  };
};

const toNewsItemFromSitemapUrl = (url: string, index: number): NewsItem => {
  const slug = slugFromUrl(url);
  const title = readableFromSlug(slug);

  return {
    id: `official-sitemap-news-${slug || index}`,
    slug: slug || `news-${index}`,
    title,
    excerpt: 'Read more for details.',
    content: 'Read more for details.',
    date: new Date().toISOString(),
    sourceUrl: url,
  };
};

const mergeById = <T extends { id: string }>(primary: T[], secondary: T[]) => {
  const merged = [...primary];
  const seen = new Set(primary.map((item) => item.id));

  secondary.forEach((item) => {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      merged.push(item);
    }
  });

  return merged;
};

const isInstitutionDirectoryPage = (page: WpPage) =>
  /institutions?/.test(page.slug) &&
  Object.keys(districtBySlug).some((district) => page.slug.includes(district));

export const officialMdesService = {
  async getInstitutionDirectories(): Promise<Institution[]> {
    const [pages, sitemapUrls] = await Promise.all([
      fetchJson<WpPage[]>(`${OFFICIAL_API_BASE}/pages?per_page=100`),
      fetchSitemapUrls(SITEMAP_URLS.pages, LOCAL_SITEMAP_URLS.pages),
    ]);

    const fromApi = pages.filter(isInstitutionDirectoryPage).map(toInstitution);
    const fromSitemap = sitemapUrls
      .filter((url) => /institutions?/.test(slugFromUrl(url)))
      .map(toInstitutionFromSitemapUrl);

    return mergeById(fromApi, fromSitemap);
  },

  async getCouncilMembers(): Promise<CouncilMember[]> {
    const [posts, media, sitemapUrls] = await Promise.all([
      fetchJson<WpCouncilPost[]>(`${OFFICIAL_API_BASE}/governing_council?per_page=100`),
      fetchJson<WpMedia[]>(`${OFFICIAL_API_BASE}/media?per_page=100`),
      fetchSitemapUrls(SITEMAP_URLS.governingCouncil, LOCAL_SITEMAP_URLS.governingCouncil),
    ]);

    const mediaById = new Map<number, WpMedia>(media.map((item) => [item.id, item]));
    const attachmentCollections = await Promise.all(
      posts.map((post) => fetchJson<WpMedia[]>(`${OFFICIAL_API_BASE}/media?parent=${post.id}&per_page=100`)),
    );

    const attachmentMembers = attachmentCollections
      .flat()
      .filter((item) => item.mime_type?.startsWith('image/'))
      .map(toCouncilMemberFromAttachment);

    const fromApi = posts.map((post) => toCouncilMember(post, mediaById));
    const fromSitemap = sitemapUrls.map((url, index) => toCouncilMemberFromSitemapUrl(url, index));

    return mergeById(attachmentMembers, mergeById(fromApi, fromSitemap));
  },

  async getCareers(): Promise<Career[]> {
    const [posts, sitemapUrls] = await Promise.all([
      fetchJson<WpCareerPost[]>(`${OFFICIAL_API_BASE}/careers?per_page=100`),
      fetchSitemapUrls(SITEMAP_URLS.careers, LOCAL_SITEMAP_URLS.careers),
    ]);

    const fromApi = posts.map(toCareer);
    const fromSitemap = sitemapUrls.map((url, index) => toCareerFromSitemapUrl(url, index));

    return mergeById(fromApi, fromSitemap);
  },

  async getLatestNews(): Promise<NewsItem[]> {
    const [posts, media, sitemapUrls] = await Promise.all([
      fetchJson<WpLatestNewsPost[]>(`${OFFICIAL_API_BASE}/latest_news?per_page=100`),
      fetchJson<WpMedia[]>(`${OFFICIAL_API_BASE}/media?per_page=100`),
      fetchSitemapUrls(SITEMAP_URLS.latestNews, LOCAL_SITEMAP_URLS.latestNews),
    ]);

    const mediaById = new Map<number, WpMedia>(media.map((item) => [item.id, item]));
    const fromApi = posts.map((post) => toNewsItem(post, mediaById));
    const fromSitemap = sitemapUrls.map((url, index) => toNewsItemFromSitemapUrl(url, index));

    return mergeById(fromApi, fromSitemap);
  },

  async getPrimaryBannerUrl(): Promise<string> {
    try {
      const localResponse = await fetch(LOCAL_BANNER_URL);
      if (localResponse.ok) {
        return LOCAL_BANNER_URL;
      }

      const bannerMedia = await fetchJson<WpMedia[]>(`${OFFICIAL_API_BASE}/media?search=MDS-banner-1&per_page=50`);
      const exactMatch = bannerMedia.find((item) => item.source_url.includes('MDS-banner-1.jpg'));
      return exactMatch?.source_url ?? bannerMedia[0]?.source_url ?? DEFAULT_OFFICIAL_BANNER_URL;
    } catch {
      return DEFAULT_OFFICIAL_BANNER_URL;
    }
  },

  getSitemapUrls() {
    return SITEMAP_URLS;
  },

  getOfficialSiteUrl() {
    return OFFICIAL_SITE_URL;
  },

  getThemeImageUrls() {
    return THEME_IMAGE_URLS;
  },
};