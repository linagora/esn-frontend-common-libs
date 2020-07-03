module.exports = function(grunt) {

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		watch: {
			/* watch and see if our javascript files change, or new packages are installed */
			js: {
				files: ['src/*.js'],
				tasks: ['uglify']
			}
		},
		
		uglify: {
			options: {
				preserveComments: 'some'
			},
			js: {
				files: grunt.file.expandMapping("*.js", "dist", {
					cwd: 'src/',
					ext: '.min.js'
				})
			}
		}
	});

	grunt.registerTask('default', 'watch');

}
