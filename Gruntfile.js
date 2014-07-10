module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }        
      }
    },
    
    shell: {
	    upload: {
		    command: 'scp css/app.css boondoc4@boondockwalker.com:www/wp-content/themes/twentythirteen/css/app.css',
			    options: {
				    stdout: true
		    }	
	    }
    },

    copy: {
      scripts: {
        expand: true,
        cwd: 'bower_components/',
        src: '**/*.js',
        dest: 'js'
      },

      maps: {
        expand: true,
        cwd: 'bower_components/',
        src: '**/*.map',
        dest: 'js'
      },
    },

    uglify: {
      dist: {
        files: {
          'js/modernizr/modernizr.min.js': ['js/modernizr/modernizr.js']
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'js/foundation/js/foundation.min.js',
          'js/init-foundation.js'
        ],

        dest: 'js/app.js',
      },

    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass', 'shell:upload']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['copy', 'uglify', 'concat', 'watch', 'shell']);

}