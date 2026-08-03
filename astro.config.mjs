// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import remarkDirective from 'remark-directive';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';

import { remarkBausteine } from './src/plugins/remark-bausteine.mjs';
import { rehypeHuellen } from './src/plugins/rehype-huellen.mjs';
import { rehypeBasispfad } from './src/plugins/rehype-basispfad.mjs';

// Unterverzeichnis auf GitHub Pages. Steht nur hier — Links im Markdown
// beginnen mit "/", rehypeBasispfad setzt das Präfix davor.
const BASIS = '/panetrisi';

// https://astro.build/config
export default defineConfig({
  site: 'https://zuhlek.github.io',
  base: BASIS,

  // MDX erbt die Markdown-Konfiguration, die Plugins gelten für .md und .mdx.
  integrations: [mdx()],

  markdown: {
    // Zwei Themes: Shiki schreibt die Dunkelvariante als CSS-Variable mit,
    // umgeschaltet wird in site.css.
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: false,
    },

    processor: unified({
      remarkPlugins: [
        remarkDirective,      // :::tipp … ::: überhaupt erst erkennen
        remarkBausteine,      // … und in Panels, Schritte, Checklisten übersetzen
        remarkDefinitionList, // "Begriff" / ":   Erklärung"
      ],
      rehypePlugins: [
        rehypeHuellen,                       // Bilder zu <figure>, Tabellen rollbar
        [rehypeBasispfad, { basis: BASIS }], // "/wissen/…" → "/panetrisi/wissen/…"
      ],
      remarkRehype: {
        handlers: { ...defListHastHandlers },
      },
    }),
  },
});
