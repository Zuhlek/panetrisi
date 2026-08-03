// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';

import { rehypeHuellen } from './src/plugins/rehype-huellen.mjs';
import { rehypeBasispfad } from './src/plugins/rehype-basispfad.mjs';

// Unterverzeichnis auf GitHub Pages. Steht nur hier — Links im Markdown
// beginnen mit "/", rehypeBasispfad setzt das Präfix davor.
const BASIS = '/panetrisi';

// https://astro.build/config
export default defineConfig({
  site: 'https://zuhlek.github.io',
  base: BASIS,

  integrations: [mdx()],

  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: false,
    },

    // Beide Erweiterungen ändern nichts an der Markdown-Syntax. Sie räumen
    // nur das fertige HTML auf, damit die Seite auf dem Handy nicht bricht.
    processor: unified({
      rehypePlugins: [
        rehypeHuellen,                       // Bild → <figure>, Tabelle rollbar
        [rehypeBasispfad, { basis: BASIS }], // "/grundlagen" → "/panetrisi/grundlagen"
      ],
    }),
  },
});
