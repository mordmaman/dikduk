import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://dikduk.co.uk',
  integrations: [
    svelte(),
    tailwind(),
    mdx(),
  ],
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: false, // Enabled only after cookie consent
    },
  }),
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
