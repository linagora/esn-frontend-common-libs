const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const AllowMutateEsmExportsPlugin = require('./test/webpack/AllowMutateEsmExports');
const angularCommon = path.resolve(__dirname, 'src', 'angular-common.js');
const angularInjections = path.resolve(__dirname, 'src', 'require-angular-injections.js');
const chartJs = path.resolve(__dirname, 'src', 'frontend', 'components', 'Chart.js/Chart.js');
const materialAdmin = path.resolve(__dirname, 'src', 'frontend', 'js', 'material.js');
const momentPath = path.resolve(__dirname, 'node_modules', 'moment', 'moment.js');
const chaiPath = path.resolve(__dirname, 'node_modules', 'chai/chai.js');

const pugLoaderOptions = {
  root: `${__dirname}/src/frontend/views`
};
const lodashPath = path.resolve(__dirname, 'node_modules', 'lodash', 'dist', 'lodash.js');

const BASE_HREF = process.env.BASE_HREF || '/';

module.exports = {
  mode: 'development',
  entry: './src/index.test.js',
  devtool: 'source-map',
  output: {
    filename: 'bundle-test.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      'moment/moment.js': momentPath,
      moment$: momentPath
    }
  },
  plugins: [
    new webpack.IgnorePlugin({ resourceRegExp: /codemirror/ }), // for summernote
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
      '$window.$': 'jquery',
      Chart: chartJs,
      chai: chaiPath,
      materialAdmin: materialAdmin,
      angular: angularCommon,
      _: lodashPath,
      moment: momentPath,
      'window.angularInjections': angularInjections
    }),
    /*
     * To transform assets/index.pug to an HTML file, with webpack autoimporting the "main.js" bundle
     */
    new HtmlWebpackPlugin({
      template: './assets/index.pug',
      filename: './index.html'
    }),
    new AllowMutateEsmExportsPlugin() // Allows mocking ES6 modules
  ],
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /all\.less$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      /*
      * for the "index.html" file of this SPA.
      *
      */
      {
        test: /assets\/index\.pug$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'pug-html-loader',
            options: {
              data: {
                base: BASE_HREF
              }
            }
          }
        ]
      },
      {
        test: /\.pug$/i,
        exclude: /assets\/index\.pug$/,
        use: [
          {
            loader: 'apply-loader'
          },
          {
            loader: 'pug-loader',
            options: pugLoaderOptions
          }
        ]
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: '$'
        }
      },
      {
        test: /\.run.js$/,
        loader: 'ignore-loader',
        include: [
          path.resolve(__dirname, 'src/frontend/js/modules/user-notification/user-notification.run.js'),
          path.resolve(__dirname, 'src/frontend/js/modules/shortcuts/shortcuts.run.js')
        ]
      }
    ]
  }
};
