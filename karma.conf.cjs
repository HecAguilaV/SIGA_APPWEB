// Karma configuration file - With Babel support
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/tests/unit/*.spec.js',
      'src/tests/integration/*.spec.js'
    ],
    exclude: [
      'src/tests/example.spec.js'
    ],
    preprocessors: {
      'src/tests/**/*.spec.js': ['babel']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
    client: {
      clearContext: false
    }
  });
};
