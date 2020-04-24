const path = require('path');
const webpack = require('webpack');

//const jquery = require('jquery');
//const angular = require('angular');

module.exports = {
  entry: {
	app: './src/index.js'
  },
  plugins: [
   new webpack.ProvidePlugin({
   $: "jquery",
   jQuery: "jquery",
   "window.jQuery": "jquery"
//    "window.$": "jquery"
  })
  ],
  output: {
    filename: 'hotyeah.bundle.6.4.2.js',
    path: path.resolve(__dirname, 'dist'),
	publicPath:'assets/'
  },
  module: {
	  rules: [
		{
		  test: /\.(jpe?g|png|gif)$/i,
		  loader:"file-loader",
		  query:{
			name:'[name].[ext]',
			outputPath:'images/'
			//the images will be emmited to public/assets/images/ folder 
			//the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png); 
		  }
		},
		{
		  test: /\.css$/,
		  loaders: ["style-loader","css-loader"]
		}
	  ]
	}

};
