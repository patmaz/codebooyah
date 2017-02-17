var config = {
   entry: './src/js/app.js',

   output: {
      path: __dirname + '/public/js',
      filename: 'app.js',
   },

   module: {
      loaders: [
         {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ['es2015', 'react'],
               plugins: ['transform-class-properties']
            }
         },
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ['es2015', 'react'],
               plugins: ['transform-class-properties']
            }
         }
      ]
   }
}

module.exports = config;