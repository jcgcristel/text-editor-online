const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');

const path = require('path');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: './favicon.ico',
        template: './index.html',
        title: 'Webpack Plugin',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new GenerateSW(),
      new WebpackPwaManifest({        
        fingerprints: false,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Text editor app.',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        icons: [
            {              
              src: path.resolve('src/images/logo.png'),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: path.join('assets', 'icons')
            },
            {
              src: path.resolve('src/images/logo.png'),
              size: '1024x1024',
              destination: path.join('assets', 'icons'),
              purpose: 'maskable'
            }
        ],
      })  
    ],

    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'], 
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
        }
      ],
    },
  };
};
