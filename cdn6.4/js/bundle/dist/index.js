var compressor = require('node-minify');
 
 
// Using UglifyJS
compressor.minify({
  compressor: 'uglifyjs',
  input: 'app.bundle.js',
  output: 'app.bundle.min.js',
  callback: function (err, min) {}
});
 
//promise.then(function(min) {});
