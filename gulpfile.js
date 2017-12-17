'use strict';

var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var bundleconfig = require('./bundle-config.json');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefixPlugin = new LessPluginAutoPrefix({browsers: ["last 2 versions", "iOS 7"]});

function bundleStyles(cfg) {
	console.log('Building Styles for ' + cfg.filename);
	console.log(cfg.src);
	console.log(cfg.dest);
  return gulp.src(cfg.src)
    .pipe(concat(cfg.filename + '.css'))
    .pipe(gulp.dest(cfg.dest));
};
function minifyStyles(cfg) {
	console.log('Minifying Styles for ' + cfg.filename);
	console.log(cfg.src);
	console.log(cfg.dest);
  return gulp.src(cfg.src)
    .pipe(concat(cfg.filename + '.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(cfg.dest));
};

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

gulp.task("minify:css", ['build:css'], function () {
    var bundle = bundleconfig["SiteBundle"];
    bundleStyles(bundle);
    minifyStyles(bundle);
});

gulp.task('watch', function(){
	gulp.watch('assets/less/*.less', ['minify:css']);
	return;
});

gulp.task('build', ['minify:css'], function(){});

gulp.task('serve', ['minify:css'], function () {
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
    gulp.watch('assets/less/*.less', ['minify:css']);
});
