import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const publicRoot = path.join(projectRoot, 'public');

const OFFICIAL_SITE_URL = 'https://mdes.in';
const LOCAL_ASSET_ROOT = '/mdes-assets';
const LOCAL_CACHE_ROOT = '/mdes-cache';

const assets = [
  {
    url: `${OFFICIAL_SITE_URL}/wp-content/themes/MDES/images/logo.png`,
    filePath: path.join(publicRoot, 'mdes-assets', 'logo.png'),
  },
  {
    url: `${OFFICIAL_SITE_URL}/wp-content/uploads/2022/12/MDS-banner-1.jpg`,
    filePath: path.join(publicRoot, 'mdes-assets', 'banner.jpg'),
  },
  {
    url: `${OFFICIAL_SITE_URL}/wp-content/themes/MDES/images/President.jpg`,
    filePath: path.join(publicRoot, 'mdes-assets', 'President.jpg'),
  },
  {
    url: `${OFFICIAL_SITE_URL}/wp-content/uploads/2022/12/Vice_President.jpg`,
    filePath: path.join(publicRoot, 'mdes-assets', 'Vice_President.jpg'),
  },
  {
    url: `${OFFICIAL_SITE_URL}/wp-content/themes/MDES/images/Secretary.jpg`,
    filePath: path.join(publicRoot, 'mdes-assets', 'Secretary.jpg'),
  },
  {
    url: `${OFFICIAL_SITE_URL}/wp-content/themes/MDES/images/treasurer.jpg`,
    filePath: path.join(publicRoot, 'mdes-assets', 'treasurer.jpg'),
  },
];

const sitemapTargets = [
  'wp-sitemap-posts-page-1.xml',
  'wp-sitemap-posts-latest_news-1.xml',
  'wp-sitemap-posts-front_banners-1.xml',
  'wp-sitemap-posts-front_gallery-1.xml',
  'wp-sitemap-posts-careers-1.xml',
  'wp-sitemap-posts-upcoming_event-1.xml',
  'wp-sitemap-posts-governing_council-1.xml',
  'wp-sitemap-posts-scrolling_news-1.xml',
  'wp-sitemap-posts-post-1.xml',
  'wp-sitemap-taxonomies-category-1.xml',
];

const fetchBinary = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return Buffer.from(await response.arrayBuffer());
};

const fetchText = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return await response.text();
};

const ensureParentDir = async (filePath) => {
  await mkdir(path.dirname(filePath), { recursive: true });
};

const syncAsset = async ({ url, filePath }) => {
  try {
    const data = await fetchBinary(url);
    await ensureParentDir(filePath);
    await writeFile(filePath, data);
    console.log(`Saved ${path.relative(projectRoot, filePath)}`);
  } catch (error) {
    console.warn(`Skipped ${url}: ${error instanceof Error ? error.message : String(error)}`);
  }
};

const syncSitemap = async (fileName) => {
  const localPath = path.join(publicRoot, 'mdes-cache', 'sitemaps', fileName);
  const remoteUrl = `${OFFICIAL_SITE_URL}/${fileName}`;

  try {
    const data = await fetchText(remoteUrl);
    await ensureParentDir(localPath);
    await writeFile(localPath, data, 'utf8');
    console.log(`Saved ${path.relative(projectRoot, localPath)}`);
  } catch (error) {
    console.warn(`Skipped ${remoteUrl}: ${error instanceof Error ? error.message : String(error)}`);
  }
};

await Promise.all(assets.map(syncAsset));
await Promise.all(sitemapTargets.map(syncSitemap));

console.log(`MDES local assets ready under ${LOCAL_ASSET_ROOT} and ${LOCAL_CACHE_ROOT}`);