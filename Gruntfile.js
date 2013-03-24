/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  // Project configuration.
  grunt.initConfig({
    watch: {
      files: [
        'less/**/*.less',
        'js/**',
        'contents/**',
        'templates/**',
        'config.json'
      ],
      tasks: ['less', 'exec:wintersmith']
    },

    exec: {
      wintersmith: {
        cmd: 'wintersmith preview'
      }
    },

    less: {
      development: {
        files: {
          'css/main.css': 'less/main.less'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'less');

};
