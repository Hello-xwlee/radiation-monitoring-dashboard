// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from '@tailwindcss/vite';   // ★ 新增

export default defineConfig({
  plugins: [react(), tailwind()],
});