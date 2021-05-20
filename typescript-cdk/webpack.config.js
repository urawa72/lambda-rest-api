const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: {
    createTodo: path.resolve(__dirname, './src/todos/create.ts'),
  },
  output: {
    filename: '[name]/index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.mjs'],
  },
};
