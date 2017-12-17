'use strict';

var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefixPlugin = new LessPluginAutoPrefix({browsers: ["last 2 versions", "iOS 7"]});

gulp.task('default', ['watch']);
gulp.task('build:css', function () {
	return gulp.src('assets/less/*.less')
		.pipe(less({
            plugins: [autoprefixPlugin],
			paths: [ path.join(__dirname, 'less','includes')]
		}))
		.pipe(gulp.dest('assets/css'))
  	.pipe(browserSync.stream());
});

gulp.task('watch', function(){
	gulp.watch('assets/less/*.less', ['build:css', 'minify-css']);
	return;
});

gulp.task('minify-css', ['build:css'], function () {
    return gulp.src(['assets/css/*.css', '!assets/css/*.min.css'])
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('serve', ['build:css', 'minify-css'], function () {
    var options = {
				server: {
					baseDir: './'
				},
        files: [
            'assets/less/*.less'
        ],
        injectChanges: true,
        reloadDelay: 250,
    };

    browserSync(options);
    gulp.watch('assets/less/*.less', ['build:css', 'minify-css']);
});
