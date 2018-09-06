const sass = require('node-sass');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Project metadata is imported into the Grunt config. This allows us to
    // refer to the values of properties within our package.json file.
    pkg: grunt.file.readJSON('package.json'),

    // Configuration for Sass plugin.
    sass: {
      options: {
        implementation: sass,
        sourceMap: true
      },
      map: {
        files: [
          {
            expand: true,       // Enable dynamic expansion.
            cwd: 'scss/',       // Src matches are relative to this path.
            src: ['**/*.scss'], // Actual pattern(s) to match.
            dest: 'css/',       // Destination path prefix.
            ext: '.css',        // Dest filepaths will have this extension.
            extDot: 'first'     // Extensions in filenames begin after the first dot
          },
        ],
      }
    },

    // The Concat plugin concatinates files into one.
    concat: {
      options: {
        // Concatenated files will be joined on this string.
        separator: '\n'
      },
      dist: {
        // The files to concatenate. All css files in the styles folder.
        // They will be concatinated in alphabetic order if * is used. For a
        // specific order an array can be used, like below. Here style.css
        // comes first, followed by all files ending with .css.
        src: [
          'css/style.css',
          'css/*.css'
        ],
        // The location of the resulting concatinated css file. Using pkg.name
        // here as an example. Refers to the "name" property in package.json.
        dest: 'css/style.css'
      }
    },

    // Plugin for minifying css files.
    cssmin: {
      target: {
        // Set the file generated from concat as target source.
        src: 'css/style.css',
        // The folder destination for our minified css file.
        dest: 'css/prod/style.min.css'
      }
    },
    // The Watch plugin Runs a task whenever files are added, changed or
    // deleted.
    watch: {
      css: {
        files: '**/*.scss',
        // The task to run when prompted, in this case "sass".
        tasks: ['sass']
      },
      livereload: {
        // Here we watch the files the sass task will compile to
        // These files are sent to the live reload server after sass compiles to them
        options: { livereload: true },
        files: ['css/*'],
      },
    }
  });

  // Load Grunt plugins.
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  // Set the default task to "watch", so running "grunt" will be equal to
  // running "grunt watch"
  grunt.registerTask('default',['watch']);
  // A demo custom task. "sass" generates css files from scss files, then
  // "concat" concatinates all files into one, and lastly "cssmin" minifies
  // that newly generated concatinated file.
  grunt.registerTask('generate', ['sass', 'concat', 'cssmin']);
}
