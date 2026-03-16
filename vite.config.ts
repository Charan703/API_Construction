import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

function getGithubPagesBase() {
  const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];

  if (!repository || repository.endsWith('.github.io')) {
    return '/';
  }

  return `/${repository}/`;
}

export default defineConfig(() => ({
  base: process.env.GITHUB_ACTIONS ? getGithubPagesBase() : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
}));
