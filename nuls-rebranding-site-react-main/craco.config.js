const CracoLessPlugin = require('craco-less')
const webpack = require('webpack')
const version = require('./package.json').version

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {
    presets: ['@babel/preset-env'],
    plugins: [
      'babel-plugin-styled-components',
      '@babel/plugin-proposal-numeric-separator',
      // ['@babel/plugin-transform-private-methods', { loose: true }],
    ],
  },
  webpack: {
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(version),
      }),
    ],
    configure: (webpackConfig) => {
      if (process.env.NODE_ENV === 'production') {
        // remove console in production
        // const TerserPlugin = webpackConfig.optimization.minimizer.find(
        //   (i) => i.constructor.name === 'TerserPlugin'
        // )
        // if (TerserPlugin) {
        //   TerserPlugin.options.terserOptions.compress.drop_console = true
        // }
        // public path
        // webpackConfig.output.publicPath = '//assets.zjzsxhy.com/sacte_at/'
      }

      webpackConfig.externals = {
        jquery: 'jQuery',
        react: 'React',
        'react-dom': 'ReactDOM',
        moment: 'moment',
        'moment-timezone': 'moment',
        ethers: 'ethers',
      }

      return webpackConfig
    },
  },
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:9098',
        changeOrigin: true,
        secure: false,
      },
      // '/api/*': {
      //   target: 'http://accounttimeline.sekai.me/',
      //   changeOrigin: true,
      //   secure: false,
      // },
      // '/assets/*': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true,
      //   secure: false,
      // },
    },
  },
}
