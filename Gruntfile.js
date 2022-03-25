'use strict';

module.exports = function(grunt) {
    
    require('time-grunt')(grunt);

    require('jit-grunt')(grunt);
    
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/styles.css': 'css/styles.css'
                }
            }
        },
        watch: {
            files: 'css/*.scss',
            tasks: ['scss']    
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src:[
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }
                }
            }
        }
    });

    grunt.registerTask('css',['sass']);
    grunt.registerTask('default',['browserSync', 'watch']);
};