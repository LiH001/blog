import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

const [repoOwner, repoName] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const isUserPage = repoName && repoOwner && repoName === `${repoOwner}.github.io`;
const githubPagesBase = isGithubPages && repoName && !isUserPage ? `/${repoName}` : undefined;

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://example.com',
  base: process.env.BASE_PATH ?? githubPagesBase,
  integrations: [mdx()],
  vite: {
    cacheDir: '.vite-cache'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
