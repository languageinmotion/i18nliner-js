/* global require, module */
var matchdep = require('matchdep');

module.exports = function(grunt){
  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  matchdep.filterDev('gruntify-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    clean: {
      tmp: [ 'tmp/**/*' ]
    },

    babel: {
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-flow",
        ],
        plugins: [
          "@babel/plugin-syntax-dynamic-import",
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-proposal-object-rest-spread",
          [
            "@babel/plugin-proposal-decorators",
            {
              "legacy": true
            }
          ],
          ["@babel/plugin-transform-runtime",
            {
              "regenerator": true
            }
          ]
        ]
      },
      testLib: {
        expand: true,
        cwd: 'lib',
        src: [ '**/*.js' ],
        dest: 'tmp/lib'
      },
      tests: {
        expand: true,
        cwd: 'test',
        src: [ '**/*.js', '!fixtures/**/*.js' ],
        dest: 'tmp/test'
      }
    },

    eslint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*_test.js']
    },

    browserify: {
      dist: {
        files: {
          'dist/i18n_js_extension.js': ['tmp/lib/extensions/i18n_js_build.js']
        }
      }
    },

    copy: {
      main: {
        cwd: 'tmp/lib/',
        src: '**',
        dest: 'dist/lib/',
        expand: true
      }
    }
  });

  grunt.registerTask('test', [ 'clean', 'babel:testLib', 'babel:tests' ]);
  grunt.registerTask('default', [ 'babel:testLib', 'babel:tests' ]);
  grunt.registerTask('dist', ['test', 'copy', 'browserify']);
};
