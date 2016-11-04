'use strict';

// Dependencies
const gulp          = require('gulp');
const plumber       = require('gulp-plumber');
const imagemin      = require('gulp-imagemin');
const autoprefixer  = require('gulp-autoprefixer');
const changed       = require('gulp-changed');
const concat        = require('gulp-concat');
const rename        = require('gulp-rename');
const sass          = require('gulp-sass');
const uglify        = require('gulp-uglify');
const cssnano       = require('gulp-cssnano');
const watch         = require('gulp-watch');
const svgstore      = require('gulp-svgstore');
const svgmin        = require('gulp-svgmin');
const path          = require('path');
const babel         = require('gulp-babel');
const jshint        = require('gulp-jshint');

// Globs
const globs = {
  sassPaths: [
    './assets/scss/**/*'
  ],
  jsPaths: [
    './assets/js/**/*',
    '!./assets/js/dist/*'
  ],
  jsVendorPaths: [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/foundation-sites/dist/foundation.min.js'
  ],
  imgPaths: [
    './assets/src_img/**/*'
  ]
};

/**
 * Run: gulp sass
 * Compiles SCSS files in CSS
 */
gulp.task('sass', () => {
  return gulp.src('./assets/scss/style.scss')
  .pipe(plumber())
  .pipe(sass({
    includePaths: [
      require('node-bourbon').includePaths,
      'node_modules/foundation-sites/scss/'
    ],
    outputStyle: 'compact'
  }))
  .pipe(autoprefixer({
    browsers: ['last 3 versions', 'ie >= 10']
  }))
  .pipe(gulp.dest('./'));
});

/**
 * Run: gulp vendorScripts
 * Concatenates any JavaScript vendor file
 */
gulp.task('vendorScripts', () => {
  return gulp.src(globs.jsVendorPaths)
  .pipe(plumber())
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('./assets/js/dist/'));
})

/**
 * Run: gulp scripts
 * Concatenates JavaScript files & JS Hint error detection
 */
gulp.task('scripts', ['vendorScripts'], () => {
  return gulp.src(globs.jsPaths)
  .pipe(jshint({
    esversion: 6
  }))
  .pipe(jshint.reporter('default'))
  .pipe(plumber())
  .pipe(babel({
    presets: ['es2015'],
    compact: false
  }))
  .pipe(concat('app.js'))
  .pipe(gulp.dest('./assets/js/dist/'));
});

/**
 * Run: gulp images
 * Optimize Images
 */
gulp.task('images', () => {
  return gulp.src(globs.imgPaths, {cwd: '.'})
  .pipe(changed('./assets/img'))
  .pipe(plumber())
  .pipe(imagemin({
    progressive: true,
    interlaced: true,
    svgoPlugins: [{ removeViewBox: false }]
  }))
  .pipe(gulp.dest('./assets/img/'));
});

/**
 * Run: gulp svgstore
 * Builds SVG icon set
 */
gulp.task('svgstore', () => {
  return gulp.src('./assets/img/icons/*.svg')
  .pipe(svgmin(file => {
    var prefix = path.basename(file.relative, path.extname(file.relative));
    return {
      plugins: [{
        cleanupIDs: {
          prefix: prefix + '-',
          minify: true
        }
      }]
    }
  }))
  .pipe(svgstore())
  .pipe(gulp.dest('./'));
});

/**
 * Run: gulp minifyScripts
 * Minify app.js after script concatenation
 */
gulp.task('minifyScripts', ['scripts'], () => {
  return gulp.src(['./assets/js/dist/*.js', '!./assets/js/dist/*.min.js'])
  .pipe(uglify())
  .pipe(rename(path => {
    path.extname = '.min.js';
    return path;
  }))
  .pipe(gulp.dest('./assets/js/dist'));
})

/**
 * Run: gulp minifyCSS
 * Minifies CSS after compiling SASS
 */
gulp.task('minifyCSS', ['sass'], () => {
  return gulp.src('./style.css')
  .pipe(cssnano())
  .pipe(gulp.dest('./'));
})

/**
 * Run: gulp build
 * Build site ready for deployment
 */
gulp.task('build', ['images', 'minifyScripts', 'minifyCSS']);

/**
 * Run: gulp
 * Default Tasks & Watchers
 */
gulp.task('default', ['sass', 'scripts', 'images'], () => {
  gulp.watch(globs.sassPaths, ['sass']);
  gulp.watch(globs.jsPaths, ['scripts']);
});

gulp.watch(globs.imgPaths, () => {
  gulp.start('images');
});