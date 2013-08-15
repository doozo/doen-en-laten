module.exports = (grunt) ->
  context =
    build: Math.round 2440587.5 + (new Date).getTime() / 86400000
  config =
    pkg: grunt.file.readJSON 'package.json'
    jade:
      index:
        files: {'deploy/':'src/index.jade'}
        options: {client:false,locals:context}
      workshops:
        files: {'deploy/':'src/workshops.jade'}
        options: {client:false,locals:context}
    stylus:
      compile:
        files: {}

  config.stylus.compile.files["deploy/#{context.build}/style.css"] = 'src/layout.styl'

  grunt.initConfig config
  grunt.loadNpmTasks 'grunt-jade'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.registerTask 'default', ['jade', 'stylus']
