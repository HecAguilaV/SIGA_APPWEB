// Karma configuration file
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/tests/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
      'src/**/*.test.js': ['webpack']
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
    webpack: {
      mode: 'development',
      resolve: {
        extensions: ['.js', '.ts', '.svelte']
      },
      module: {
        rules: [
          {
            test: /\.svelte$/,
            use: 'svelte-loader'
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      }
    }
  });
};
