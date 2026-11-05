import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://givemehat.github.io',
  base: '/knowledge-hub',
  integrations: [tailwind()],
  output: 'static',
  i18n: {
    defaultLocale: 'hi',
    locales: ['hi', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false
    }
  }
});
