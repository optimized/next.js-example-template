module.exports = {
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.(css|scss|svg|jpg)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      }
    ,
    {
      test: /\.(svg|jpg)$/,
      loader: 'babel-loader!raw-loader'
    }
  ,
      {
        test: /\.css$/,
        loader: 'babel-loader!raw-loader!sass-loader'
      }
    ,
      {
        test: /\.scss$/,
        loader: 'babel-loader!raw-loader!sass-loader'
      }
    )
    return config
  }
}
