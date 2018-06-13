const path = process.cwd();

const config = {
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ],
  }
};

module.exports = [{
  ...config,
  output: {
    filename: 'main.js',
    library: 'REACT FORM VALIDATION',
    libraryTarget: 'commonjs2'
  }
}, {
  ...config,
  output: {
    path: __dirname + "/examples/src",
		filename: "main.js",
    library: 'REACT FORM VALIDATION',
    libraryTarget: 'commonjs2'
  }
}];