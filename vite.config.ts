import path from "path"
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function inlineProductionCss(): Plugin {
  return {
    name: 'inline-production-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const htmlAsset = Object.values(bundle).find(
        (asset) => asset.type === 'asset' && asset.fileName === 'index.html',
      )
      if (!htmlAsset || htmlAsset.type !== 'asset' || typeof htmlAsset.source !== 'string') return

      let html = htmlAsset.source
      for (const [fileName, output] of Object.entries(bundle)) {
        if (output.type !== 'asset' || !fileName.endsWith('.css')) continue

        const css = String(output.source).replaceAll('</style', '<\\/style')
        const escapedFileName = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const stylesheet = new RegExp(
          `<link rel="stylesheet"[^>]*href="/?${escapedFileName}"[^>]*>`,
        )

        if (stylesheet.test(html)) {
          html = html.replace(stylesheet, `<style data-critical-css>${css}</style>`)
          delete bundle[fileName]
        }
      }

      htmlAsset.source = html
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), inlineProductionCss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react/') || id.includes('react-dom/')) {
              return 'vendor-react'
            }
            if (id.includes('motion')) {
              return 'vendor-motion'
            }
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'vendor-icons'
            }
            return 'vendor-libs'
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
