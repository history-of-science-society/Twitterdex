'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const minify = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const zip = require('gulp-zip');
const rev = require('gulp-rev');
const inject = require('gulp-inject');

// Inject
gulp.task('inject', function () {
    let target = gulp.src('twitterdex/index.html');
    let sources = gulp.src(['twitterdex/css/*.css', 'twitterdex/js/*.js'], {
        read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./twitterdex/'));
})

// Watch
gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
});


// CSS Runner
gulp.task('css', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(rev())
        .pipe(gulp.dest('twitterdex/css'));
})

// JS Runner
gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(minify({
            noSource: true
        }))
        .pipe(rev())
        .pipe(gulp.dest('twitterdex/js'))
})


// CSS tasks
gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'));
});

gulp.task('autoprefix', () =>
    gulp.src('src/css/main.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('twitterdex/css'))
);

gulp.task('minify-css', () => {
    return gulp.src('twitterdex/css/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('twitterdex/css/min'));
});

// JS tasks
gulp.task('babel', () =>
    gulp.src('src/js/main.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('twitterdex/js'))
);

gulp.task('compress', function () {
    gulp.src('twitterdex/js/*.js')
        .pipe(minify())
        .pipe(gulp.dest('twitterdex/js/min'))
});

// File zipper
gulp.task('zip', () => {
    return gulp.src('twitterdex/**')
        .pipe(zip('twitterdex.zip'))
        .pipe(gulp.dest('upload'))
});