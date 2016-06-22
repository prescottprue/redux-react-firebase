'use strict'

const webpack = require('webpack')
const pkg = require('./package.json')

const env = process.env.NODE_ENV
// Folder Settings
const folders = {
  src: 'source',
  dist: 'dist'
}

// Library
const librarySettings = {
  export: { name: 'ReduxReactFirebase', file: 'redux-react-firebase.js' },
  entryFile: './' + folders.src + '/index.js'
}

// Banner text placed at the top of library
const bannerText = librarySettings.export.file + '.js v' + pkg.version + ' | (c) ' + pkg.author

let config = {
  entry: [ 'babel-polyfill', librarySettings.entryFile ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  output: {
    library: librarySettings.export.name,
    libraryTarget: 'umd',
    publicPath: '/' + folders.dist + '/'
  },
  plugins: [
    new webpack.BannerPlugin(bannerText, { raw: false, entryOnly: true }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

module.exports = config
