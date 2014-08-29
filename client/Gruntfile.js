var path = require('path');

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
          targetDir: 'app',
          layout: function(type) {
            var renamedType = type;
            if (type === 'js') {
              renamedType = 'scripts';
            } else if (type === 'css') {
              renamedType = 'styles';
            }
            return path.join(renamedType, 'lib');
          }
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'app/scripts/diasroom-watcher.js': ['js/diasroom-watcher.js']
        }
      }
    },
    coffee: {
      compile: {
        files: [
          {
            expand: true,
            cwd: 'coffee/',
            src: ['**/*.coffee'],
            dest: 'js',
            ext: '.js'
          }
        ]
      }
    },
    watch: {
      coffee: {
        files: ['coffee/**/*.coffee'],
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['coffee', 'browserify']);
  grunt.registerTask('default', ['build']);
};
