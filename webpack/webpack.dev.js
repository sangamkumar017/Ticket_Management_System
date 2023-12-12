const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('dev'),
      'process.env.REACT_APP_TICKET_API': JSON.stringify(
        'https://5jg01ylkhd.execute-api.ap-southeast-1.amazonaws.com/'
      ),
      'process.env.REACT_APP_SECURE_DOWNLOAD_API': JSON.stringify(
        'https://cloud-api.adroit-vantage.com/dev/aim/'
      ),
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
}
