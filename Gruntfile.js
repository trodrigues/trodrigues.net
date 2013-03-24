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
      tasks: ['less', 'exec:wintersmithPreview']
    },

    exec: {
      wintersmithPreview: {
        cmd: 'wintersmith preview'
      }
    },

    less: {
      development: {
        files: {
          'css/main.css': 'less/main.less'
        }
      }
    },

    clean: [
      'css/main.css',
      'build'
    ]
  });

  // Default task.
  grunt.registerTask('default', ['clean', 'build']);
  grunt.registerTask('preview', 'exec:wintersmithPreview');
  grunt.registerTask('build', ['less' 'exec:wintersmithBuild']);

};
