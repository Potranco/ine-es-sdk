import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'ine-es-sdk',
      fileName: (format) => `ine-es-sdk.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        exports: 'named',
        globals: {},
      },
    },
    sourcemap: true,
    minify: true, // mantiene código legible
    target: 'esnext', // Aprovecha todas las features modernas de Node 24
  },
})
