const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const bs = require('browser-sync').create();
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('imageMin', () => {
    return gulp.src('./resources/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

gulp.task('copy', () => {
    return gulp.src('./resources/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('fonts', () => {
    return gulp.src('./resources/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('script', () => {
    return gulp.src(['./resources/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('sass', () => {
    return gulp.src('./resources/sass/*.scss')
        .pipe(concat('styles.css'))
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('serve', ['script', 'imageMin', 'copy', 'fonts', 'sass'], () => {
    bs.init({
        server: './dist'
    });

    gulp.watch('./resources/img/*', ['imageMin'])
    gulp.watch('./resources/sass/**/*.scss', ['sass'])
    gulp.watch('./resources/js/**/*.js', ['script'])
    gulp.watch('./resources/*.html', ['copy'])

    gulp.watch('./dist/js/*.js').on('change', bs.reload)
    gulp.watch('./dist/css/*.css').on('change', bs.reload)
    gulp.watch("./dist/*.html").on('change', bs.reload)
});

gulp.task('default', ['serve']);