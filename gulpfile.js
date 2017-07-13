'use strict';

var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');

var autopolyfiller = require('gulp-autopolyfiller');

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefixPlugin = new LessPluginAutoPrefix({browsers: ["last 2 versions", "iOS 7"]});

gulp.task('default', ['watch']);
gulp.task('build', function () {
	return gulp.src('wwwroot/less/*.less')
		.pipe(less({
            plugins: [autoprefixPlugin],
			paths: [ path.join(__dirname, 'less','includes')]
		}))
		.pipe(gulp.dest('wwwroot/css'))
        .pipe(browserSync.stream());
});

gulp.task('autopolyfiller', function () {
    return gulp.src('wwwroot/js/*.js')
        .pipe(autopolyfiller('result_polyfill_file.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function(){
	gulp.watch('wwwroot/less/*.less', ['build', 'minify-css']);
	return;
});

gulp.task('minify-css', ['build'], function () {
    return gulp.src(['wwwroot/css/*.css', '!wwwroot/css/*.min.css'])
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('wwwroot/css'));
});

gulp.task('serve', ['build', 'minify-css'], function () {

    var options = {
        proxy: 'localhost:' + 5000,
        port: 5000,
        files: [
            'wwwroot/less/*.less'
        ],
        injectChanges: true,
        reloadDelay: 250,
    };

    browserSync(options);
    gulp.watch('wwwroot/less/*.less', ['build', 'minify-css']);
});
