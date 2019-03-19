import path from 'path'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const DEV_SERVER_PORT = 3000
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const PATH_TO_SRC = path.resolve(__dirname, '..', 'src')
const PATH_TO_DIST = path.resolve(__dirname, 'js')
const PATH_TO_DEV_DIST = path.resolve(__dirname, 'public')

const CLEAN_OPTIONS = {
  // Instead of this ugly hack — we will get "wwwroot is outside of the project root. Skipping..."
  root: path.resolve(PATH_TO_DIST, '..'),
  exclude: ['index.html', 'favicon.png'],
  verbose: true,
  dry: false,
}

const productionPlugins = [
  new CleanWebpackPlugin(PATH_TO_DIST, CLEAN_OPTIONS),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
]

export default {
  mode: 'development',

  entry: path.resolve(PATH_TO_SRC, 'index.js'),

  output: {
    path: !IS_PRODUCTION ? PATH_TO_DEV_DIST : PATH_TO_DIST,
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      '@': PATH_TO_SRC,
    },
  },

  target: 'web',

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [PATH_TO_SRC],
      },
      {
        test: /\.less$/,
        use: [
          !IS_PRODUCTION ? 'style-loader' : MiniCssExtractPlugin.loader, // CommonJS => Style nodes
          'css-loader', // CSS => CommonJS
          'less-loader', // Less => CSS
        ],
      },
      {
        test: /\.(png|jp(e?)g|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: IS_PRODUCTION ? productionPlugins : [],

  devServer: {
    port: DEV_SERVER_PORT,
    hotOnly: true,
    contentBase: [PATH_TO_DEV_DIST], // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    https: false, // true for self-signed, object for cert authority
    noInfo: false, // only errors & warns on hot reload
  },
}
