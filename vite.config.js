import { dirname, resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: {
        'ine-es-sdk': resolve(import.meta.dirname, 'src/index.ts'),
      },
      name: 'ine-es-sdk',
      fileName: 'ine-es-sdk',
    },
    rolldownOptions: {
      external: [],
      output: {
        globals: {
            
        },
      },
    },
  },
})