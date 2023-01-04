import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['instaballot.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'instaballot',
        short_name: 'instaballot',
        description: 'Anonymous surveys in an instant',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'instaballot-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'instaballot-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    open: '/',
    port: 3000,
  },
});
