import { defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { viteExternalsPlugin } from 'vite-plugin-externals'
import wasm from 'vite-plugin-wasm'

// const chunk1 = ['antd', '@ant-design/icons']
// const chunk2 = [
//   '@cosmjs/cosmwasm-stargate',
//   '@cosmjs/crypto',
//   '@cosmjs/encoding',
//   '@cosmjs/stargate',
//   '@cosmos-kit/core',
//   '@cosmos-kit/keplr',
//   '@cosmos-kit/leap',
//   '@cosmos-kit/react',
//   'cosmjs-types',
//   'cosmjs-utils',
// ]
// const chunk3 = ['@uniswap/sdk', '@uniswap/sdk-core', '@uniswap/v3-sdk']
// const chunk4 = [
//   'web3'
// ]

// import inject from '@rollup/plugin-inject'
// https://vitejs.dev/config/
const plugins = [
  react({
    babel: {
      plugins: ['babel-plugin-styled-components'],
    },
  }),
  splitVendorChunkPlugin(),
  nodePolyfills(),
  visualizer({
    template: 'treemap', // or sunburst
    open: false,
    gzipSize: true,
    brotliSize: true,
    filename: 'analyse.html', // will be saved in project's root
  }) as any,
  wasm(),
]
if (process.env.NODE_ENV === 'production') {
  plugins.push(
    viteExternalsPlugin({
      jquery: 'jQuery',
      react: 'React',
      'react-dom': 'ReactDOM',
      moment: 'moment',
      'moment-timezone': 'moment',
    })
  )
}
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const CDN_URL = env.VITE_CDN_URL

  console.log(CDN_URL)

  return {
    base: process.env.NODE_ENV === 'development' ? undefined : CDN_URL,
    plugins,
    server: {
      port: 8000,
      host: '0.0.0.0',
      proxy: {
        '^/images/*': {
          target: 'http://localhost:8089/',
          changeOrigin: true,
          secure: false,
        },
        '^/audios/*': {
          target: 'http://localhost:8089/',
          changeOrigin: true,
          secure: false,
        },
        '^/rest/*': {
          target: 'http://localhost:8888/',
          changeOrigin: true,
          secure: false,
        },
        '^/socket.io/*': {
          target: 'http://localhost:8089/',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
      cssMinify: true,
      // terserOptions: {
      //   compress: true,
      // },
      sourcemap: false,
      // rollupOptions: {
      //   output: {
      //     manualChunks: {
      //       vendor: chunk1,
      //       vendor1: chunk2,
      //       vendor2: chunk3,
      //       vendor3: chunk4,
      //     },
      //   },
      // },
      // target: 'esnext',
      // rollupOptions: {
      //   output: {
      //     manualChunks(id: string) {
      //       if (id.includes('node_modules')) {
      //         if (chunk1.find((label) => id.includes(label))) {
      //           return 'chunk1'
      //         }
      //         if (chunk2.find((label) => id.includes(label))) {
      //           return 'chunk1'
      //         }
      //         if (chunk3.find((label) => id.includes(label))) {
      //           return 'chunk1'
      //         }
      //         return 'chunk0'
      //       }
      //     }
      //   },
      // },
    },
  }
})
