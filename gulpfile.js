'use strict'

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var del         = require('del');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cleanCss = require('gulp-clean-css');
var flatmap = require('gulp-flatmap');
var htmlmin = require('gulp-htmlmin')

gulp.task('sass', function() {
    return gulp.src('./css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('serve', gulp.series('sass', function() {
	var files = [
      './*.html',
      './css/*.css',
      './img/*.{png,jpg,gif}',
      './js/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: "./"
      }
   });

    gulp.watch('./css/*.scss', gulp.series('sass'));
}));

gulp.task('default', gulp.series('serve'));

gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('copyfonts',
  async function() {
     gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
     .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('imagemin', function() {
    return gulp.src('img/*.{png,jpg,gif}')
    .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('usemin', function() {
    return gulp.src('./*.html')
    .pipe(flatmap(function(stream, file) {
        return stream
        .pipe(usemin({
            css: [rev()],
            html: [ function() { return htmlmin({ collapseWhitespace: true }) }],
            js: [ uglify(), rev() ],
            inlinejs: [uglify()],
            inlinecss: [cleanCss(), 'concat']
        }))
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('copyfonts','imagemin','usemin')));