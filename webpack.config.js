const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const applications = require('./projects/portal/applications.config.js');

const PORT = 4000;

const devApplications = {
  menu: 'http://localhost:4200',
  app1: 'http://localhost:4201',
  app2: 'http://localhost:4202',
};

module.exports = {
  entry: [
    __dirname + '/projects/portal/main.js',
    __dirname + '/projects/portal/main.css'
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/projects/portal/index.html'
    }),
  ],
  output: {
    path: process.cwd() + '/dist',
    filename: '[name].js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    port: PORT,
    publicPath: '/dist/',
    contentBase: './',
    historyApiFallback: true,
    proxy: getProxyConfig(applications, devApplications),
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, './'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: getBabelConfig(),
      }
    ],
  },
  /*optimization: {
    splitChunks: {
      name: 'common',
      chunks: module => module.context && module.context.indexOf('node_modules') !== -1
    }
  },*/
};

function getBabelConfig() {
  return {
    presets: [
      ['@babel/preset-env', {
        targets: {
          'browsers': ['last 2 versions'],
        },
      }],
    ],
  };
}
function getProxyConfig(applications, devApplications) {
  const proxy = {};
  for (app of applications) {
    const path = app.baseHref + '/';
    let target = `http://localhost:${PORT}/dist/${path}`;
    if (devApplications.hasOwnProperty(app.name)) {
      target = devApplications[app.name];
    }
    proxy[path] = {
      target: target,
      pathRewrite: {
        [path]: ''
      },
      bypass: function (req, res, proxyOptions) {
        if (req.headers.accept.indexOf('html') !== -1) {
          return '/index.html';
        }
      }
    };
  }
  return proxy;
}
