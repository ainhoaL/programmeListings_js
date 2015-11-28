var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
var mocha = require('gulp-mocha');

var NONJS = ['src/**/*html', 'src/**/*css'];
var SRC = 'src/**/*js';
var BLD = 'bld';
var TESTS = 'test/**/*js';
var BLDTESTS = 'bldtest';

gulp.task('copy-nonjs', () => {
    return gulp.src(NONJS)
        .pipe(gulp.dest(BLD))
});

gulp.task('compile-src', () => {
    return gulp.src(SRC)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(BLD));
});

gulp.task('compile-tests', () => {
    return gulp.src(TESTS)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(BLDTESTS));
});

gulp.task('test', ['compile-tests'], () => {
	return gulp.src(BLDTESTS + '/*.js')
        .pipe(mocha());
});

gulp.task('build', ['copy-nonjs', 'compile-src', 'test']);

gulp.task('build-watch', ['build'], () => {
    return gulp.watch([SRC, TESTS, NONJS], ['build', 'test', 'copy-nonjs']);
});
