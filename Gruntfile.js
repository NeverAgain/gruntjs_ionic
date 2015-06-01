/* Gruntfile.js
 * Grunt workflow for building AngularJS/Ionic applications.
 */

'use strict';

var
  LIVERELOAD_PORT = 35729,
  lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT }),
  mountFolder = function( connect, dir ) {
    return connect.static(require('path').resolve(dir));
  };

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-haml2html');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: 'coffee/',
          src: '**/*.coffee',
          dest: 'www/js',
          ext: '.js'
        }]
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'scss/',
          src: '**/*.scss',
          dest: 'www/css',
          ext: '.css'
        }]
      }
    },

    haml: {
      dist: {
        files: [{
          expand: true,
          cwd: 'haml/',
          src: '**/*.haml',
          dest: 'www/',
          ext: '.html'
        }]
      }
    },

    ngAnnotate: {
      application: {
        files: {
          'www/js/app.js': ['www/js/app.js']
        }
      }
    },

    watch: {
      livereload: {
        files: [
          '{,*/}*.html',
          'static/{,*/}*.{css,js,png,jpg,gif,svg}'
        ],
        tasks: ['jshint'],
        options: {
          livereload: LIVERELOAD_PORT
        }
      },
      scripts: {
        files: [
          './coffee/**/*.coffee'
        ],
        tasks: ['newer:coffee'],
        options: {
          livereload: true
        }
      },
      styles: {
        files: [
          './scss/**/*.scss'
        ],
        tasks: ['newer:sass'],
        options: {
          livereload: true
        }
      },
      views: {
        files: ['./haml/**/*.haml'],
        tasks: ['newer:haml'],
        options: {
          livereload: true
        }
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function( connect ) {
            return [
              lrSnippet,
              mountFolder(connect, './www')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    }
  });

  grunt.registerTask('server', function() {
    grunt.task.run([
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask(
    'serve',
    'Builds scripts and styles and watches for changes',
    ['haml', 'sass', 'coffee', 'ngAnnotate', 'connect:livereload', 'open', 'watch']
  );
};

