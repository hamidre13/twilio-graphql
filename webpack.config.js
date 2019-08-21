const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const webpackMerge = require('webpack-merge');
const modeCondfig = env => require(`./build-tools/webpack.${env}`)(env);

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
  const config =  webpackMerge(
    {
      target: 'node',
      node: {
        __filename: true,
        __dirname: true
      },

      module: {
        rules: [
          {
            test: /\.ts(x?)$/,
            use: [
              {
                loader:'ts-loader'
              }
            ],
            exclude: /node_modules/
          },
          {
            test: /\.js?$/,
            use: [
              {
                loader: 'babel-loader'
              }
            ],
            exclude: /node_modules/
          },
          {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            use: {
              loader: 'raw-loader'
            }
          }
        ]
      },
      resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        // Without this ts files won't load
        extensions: ['.ts', '.js']
      },
      plugins: [new webpack.ProgressPlugin()]
    },
    modeCondfig(mode)
  );
  //console.log(config)
  return config
};
