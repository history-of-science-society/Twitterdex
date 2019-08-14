'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const minify = require('gulp-minify');


gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('compress', function() {
    gulp.src('src/js/*.js')
      .pipe(minify())
      .pipe(gulp.dest('dist/js'))
  });


gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
});