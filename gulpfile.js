const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    csso = require('gulp-csso'),
    cssbeautify = require('gulp-cssbeautify'),
    pug = require('gulp-pug'),
    terser = require('gulp-terser');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app/dist',
    },
    notify: false,
  });
});

gulp.task('pug', function() {
  return gulp.src('app/**/*.pug').pipe(pug({
    pretty: true,
  })).pipe(gulp.dest('app/dist'));
});

gulp.task('styles', function() {
  return gulp.src([
    'node_modules/bulma/bulma.sass',
    'app/scss/**/*.scss',
  ])
      .pipe(sass({outputStyle: 'expanded'}).on('error', notify.onError()))
      .pipe(rename({
        suffix: '.min',
        prefix: '',
      }))
      .pipe(autoprefixer(['last 4 versions']))
      .pipe(csso({
        comments: false,
      }))
      .pipe(cssbeautify({
        indent: '  ',
        openbrace: 'separate-line',
        autosemicolon: true,
      }))
      .pipe(gulp.dest('app/dist/css'))
      .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src([
    'app/js/helpers.js',
    'app/js/common.js',
  ])
      .pipe(concat('scripts.min.js'))
      .pipe(terser())
      .pipe(gulp.dest('app/dist/js'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('code', function() {
  return gulp.src('app/dist/**/*.html')
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss',
      gulp.parallel('styles'));
  gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
  gulp.watch('app/**/*.pug', gulp.parallel('code', 'pug'));
  gulp.watch('app/service/**/*.css', gulp.parallel('code', 'pug'));
});

gulp.task('default',
    gulp.parallel('styles', 'scripts', 'pug', 'browser-sync', 'watch'));
