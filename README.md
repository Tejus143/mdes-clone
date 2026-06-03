# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Official MDES Data Sync

The app can sync institutions and governing council records from public MDES WordPress endpoints:

- `https://mdes.in/wp-json/wp/v2/pages?per_page=100`
- `https://mdes.in/wp-json/wp/v2/governing_council?per_page=100`
- `https://mdes.in/wp-json/wp/v2/media?per_page=100`

It also consumes official sitemap XML feeds as additional sources:

- `https://mdes.in/wp-sitemap-posts-post-1.xml`
- `https://mdes.in/wp-sitemap-posts-page-1.xml`
- `https://mdes.in/wp-sitemap-posts-latest_news-1.xml`
- `https://mdes.in/wp-sitemap-posts-front_banners-1.xml`
- `https://mdes.in/wp-sitemap-posts-front_gallery-1.xml`
- `https://mdes.in/wp-sitemap-posts-careers-1.xml`
- `https://mdes.in/wp-sitemap-posts-upcoming_event-1.xml`
- `https://mdes.in/wp-sitemap-posts-governing_council-1.xml`
- `https://mdes.in/wp-sitemap-posts-scrolling_news-1.xml`
- `https://mdes.in/wp-sitemap-taxonomies-category-1.xml`

By default, sync is enabled and the app falls back to local mock data if the request fails.

To force mock-only mode, set:

`VITE_USE_OFFICIAL_MDES=false`

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
