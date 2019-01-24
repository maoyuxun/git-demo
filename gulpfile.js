

'use strict';

// 载入Gulp模块
var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// 注册样式编译任务
gulp.task('style', function() {
    gulp.src('src/style/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/style'))
        .pipe(reload({
            stream: true
        }));
});

// 注册脚本合并压缩任务
gulp.task('script', function() {
    gulp.src('src/script/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/script'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('image', function() {
    gulp.src('src/image/*.*')
        .pipe(gulp.dest('dist/image'))
        .pipe(reload({
            stream: true
        }));
})

gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
        }))
        .pipe(gulp.dest('dist'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('serve', ['style', 'script', 'image', 'html'], function() {
    browserSync({
        notify: false,
        port: 2015,
        server: {
            baseDir: ['dist']
        }
    });


    gulp.watch('src/style/*.less', ['style']);
    gulp.watch('src/script/*.js', ['script']);
    gulp.watch('src/image/*.*', ['image']);
    gulp.watch('src/*.html', ['html']);
});
