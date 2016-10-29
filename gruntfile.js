'use strict';
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			main: {
				src: ['dist']
			}
		},
		uglify: {
			main: {
				files: [
					{ src: 'src/ng-y-drag.js', dest: 'dist/ng-y-drag.min.js' }
				]
			}
		},
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'dist/ng-y-drag.min.css': ['src/ng-y-drag.css']
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.registerTask('default', ['clean', 'uglify', 'cssmin']);
};