var gulp = require('gulp');
var webserver = require('gulp-webserver');
var include = require('gulp-html-tag-include');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var replace = require('gulp-replace');
var rename = require('gulp-rename');

var src = 'public/src';
var dist = 'public/dist';

var paths = {
	js: src + '/js/*.js',
	js_sub: src + '/js/**/*.js',
	scss: src + '/scss/*.scss',
	scss_sub: src + '/scss/**/*.scss',
	html: src + '/html/*.html',
	html_sub: src + '/html/**/*.html'
};

// webserver 설정
gulp.task('webserver', function() {
	gulp.src(dist + '/')
	.pipe(webserver({
		livereload: true,
		//port:8003,
		//host:'192.168.11.172',
		open:true
	}));
});

// es6
gulp.task('es6', function () {
	return gulp.src([paths.js, paths.js_sub])
		.pipe(sourcemaps.init())
		.pipe(babel(
			{presets: ['es2015']}
		))
		//.pipe(uglify()) --> source minify
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(dist + '/resources/js'));
});

// html파일 include
gulp.task('html-include', function() {
    return gulp.src([paths.html, paths.html_sub])
    	.pipe(include())
        .pipe(gulp.dest(dist + '/'));
});

// sass 파일을 css 로 컴파일한다.
gulp.task('compile-sass', function () {
	return gulp.src(paths.scss)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(dist + '/resources/css'));
});

// html파일을 jsp로 변환하고 링크 주소에서 .html -> 없애기
gulp.task('templates', function(){
	return gulp.src([paths.html, paths.html_sub])
		.pipe(replace(/(<a\s)(.+)?(href=")([^"]+)(\.html)/gi , '$1$2$3$4'))
		.pipe(rename(function (path) {
			path.extname = ".jsp"
		}))
		.pipe(gulp.dest(dist + '/jsp/'));
});

// 파일 변경 감지 및 브라우저 재시작
gulp.task('watch', function () {
	livereload.listen();
	gulp.watch([paths.scss, paths.scss_sub], ['compile-sass']);
	gulp.watch([paths.html, paths.html_sub], ['html-include', 'templates']);
	gulp.watch([paths.js, paths.js_sub], ['es6']);
	gulp.watch(dist + '/**').on('change', livereload.changed);
});

gulp.task('default', [
	'webserver',
	'es6',
	'html-include',
	'compile-sass',
	'templates',
	'watch'
]);