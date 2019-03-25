var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    watch        = require('gulp-watch'),
    concat       = require('gulp-concat'),
    csso         = require('gulp-csso'),
    uglify       = require('gulp-uglify'),
    tiny         = require('gulp-tinypng-nokey'),
    connect      = require('gulp-connect'),
    plumber      = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger');

var path = {
    build: {
        css:    './assets/css/',
        js:     './assets/js/',
        images: './assets/i/',
        html: './',
    },
    src: {
    	images: './src/i/**/*',
        css: [
            './src/scss/libs/slick.scss',
            './src/scss/libs/slick-theme.scss',
            './src/scss/libs/slick-theme.scss',
            './src/scss/libs/fancybox-1.3.4.scss',
            './src/scss/libs/jquery.background-video.css',
            './src/scss/*.scss',
        ],
        js: [
            './src/js/libs/jquery-3.1.1.min.js',
            './src/js/libs/mousewheel-3.0.4.pack.js',
            './src/js/libs/fancybox-1.3.4.js',
            './src/js/libs/slick.min.js',
            './src/js/libs/jquery.background-video.js',
        	'./src/js/module/*.js',
        	'./src/js/page/*.js',
        	'./src/js/*.js'
        ],
        html: './src/tmp/*.html',
    },

    watch: {
        css: './src/scss/*.scss',
        js:  './src/js/*.js',
        html: './src/tmp/*.html',
    }
};

//server
gulp.task('connect', function() {
    connect.server({
        port: 8000,
        livereload: true
    });
});

//sass
gulp.task('css', function() {
    gulp.src(path.src.css)
        .pipe(plumber())
        .pipe(concat('styles.min.css'))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.css))
        .pipe(connect.reload());
});

//js
gulp.task('js', function() {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.js))
        .pipe(connect.reload());
});

//images
gulp.task('images', function() {
    gulp.src([path.src.images])
        .pipe(tiny())
        .pipe(gulp.dest(path.build.images));
});
//html
gulp.task('html', function() {
    gulp.src([path.src.html])
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(connect.reload());
});

//watcher
gulp.task('watch', function(){
    watch([path.watch.css], function(event, cb) {
        gulp.start('css');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
});

gulp.task('build', ['css', 'js']);

gulp.task('default', ['connect', 'watch']);
