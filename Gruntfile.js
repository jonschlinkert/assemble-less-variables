/*
 * assemble-less
 * http://github.com/assemble/assemble-less
 *
 * Copyright (c) 2013 Assemble
 * MIT License
 */

module.exports = function(grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Metadata for templates
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner: '/*\n' +
      ' * <%= pkg.name %> v<%= pkg.version %>\n' +
      '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
      ' *\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= _.capitalize(pkg.author.name) %>\n' +
      ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
      ' */\n'
    },

    variables: {
      main: {
        options: {
          banner: '<%= meta.banner %>',
          variables: grunt.file.readJSON('test/vars.json')
        },
        files: {
          'tmp/main.less': ['test/fixtures/**/*.less']
        }
      },
      bootstrap: {
        options: {
          variables: {
            background: 'red',
            margin: 0,
            color: 'blue'
          }
        },
        files: {
          'tmp/bootstrap.less': ['test/fixtures/**/*.less']
        }
      },
      overrides: {
        options: {
          banner: '<%= meta.banner %>',
          variables: grunt.file.readJSON('test/vars.json')
        },
        files: {
          'tmp/overrides.less': ['test/fixtures/**/*.less']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    jshint: {
      files: [
        'Gruntfile.js',
        'lib/**/*.js',
        'tasks/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Clean out files from last run,
    // before creating new ones.
    clean: {
      tests: { src: 'test/css/**/*.css' }
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Default tasks to be run.
  grunt.registerTask('default', ['jshint', 'clean', 'variables']);

  // Tests to be run.
  grunt.registerTask('test', ['default', 'nodeunit']);
};
