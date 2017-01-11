'use strict';

var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var nodeResolve = require('resolve');

var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var sass = require('gulp-sass');

var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

var browserSync = require('browser-sync').create();

// ----------------------------------------------------------------------------
// Definitions

var DJANGO = '127.0.0.1:8000';

var PROJECT = 'witlof';
var PROJECT_STATIC = path.join(PROJECT, 'static', 'witlof');

var STYLES = [
  'assets/styles/main.scss',
  'assets/styles/preview.scss',
]

var VENDOR_SCRIPTS = [
  'classnames',
  'immutable',
  'js-cookie',
  'numeral',
  'react',
  'react-dnd',
  'react-dnd-html5-backend',
  'react-dom',
  'react-dropzone',
  'react-redux',
  'redux',
  'redux-thunk',
  'redux-logger',
  'slug',
]

var SCRIPTS = [
  {
    target: 'node.js',
    entry: 'assets/scripts/node/main.js',
    external: VENDOR_SCRIPTS,
  },
  {
    target: 'node-actions.js',
    entry: 'assets/scripts/node-actions/main.js',
    external: VENDOR_SCRIPTS,
  },
  {
    target: 'document.js',
    entry: 'assets/scripts/document/main.js',
    external: VENDOR_SCRIPTS,
  },
]

var ASSETS = [
  {
    src: 'bower_components/jquery/dist/jquery.min.js',
    dest: 'scripts/'
  },
  {
    src: 'bower_components/bootstrap/js/dist/**/*',
    dest: 'bootstrap/scripts/'
  },
  {
    src: 'bower_components/font-awesome/fonts/**/*',
    dest: 'fonts/font-awesome/'
  },
  {
    src: 'bower_components/froala-wysiwyg-editor/js/**/*',
    dest: 'scripts/froala/'
  },
]

// ----------------------------------------------------------------------------
// Default

gulp.task('default', ['copy-assets', 'styles', 'scripts-watch'], function() {

  browserSync.init({
    notify: false,
    proxy: DJANGO,
    open: false,
  });

  gulp.watch(['assets/**/*.scss'], ['styles']);
  gulp.watch([path.join(PROJECT, '**/*.py'), path.join(PROJECT, '**/*.html')])
    .on('change', browserSync.reload);
});

// ----------------------------------------------------------------------------
// Build

gulp.task('build', ['copy-assets', 'styles', 'scripts']);

// ----------------------------------------------------------------------------
// Copy various assets

gulp.task('copy-assets', function() {
  ASSETS.map(function(asset) {
    gulp.src(asset.src).pipe(gulp.dest(path.join(PROJECT_STATIC, asset.dest)));
  });
});

// ----------------------------------------------------------------------------
// Styles

function processStyle(src) {
  gulp.src(src)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .on('error', handleError)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(PROJECT_STATIC, 'styles')))
    .pipe(browserSync.stream({match: '**/*.css'}));
}

gulp.task('styles', [], function () {
  STYLES.map(function(style) { processStyle(style); });
});

// ----------------------------------------------------------------------------
// Scripts

gulp.task('scripts', ['vendor-scripts'], function () {
  createScriptBundles(false);
});

gulp.task('scripts-watch', ['vendor-scripts'], function () {
  createScriptBundles(true)
});

gulp.task('vendor-scripts', function () {

  var bundler = browserify({
    debug: true
  });

  VENDOR_SCRIPTS.map(function (id) {
    bundler.require(nodeResolve.sync(id), { expose: id });
  });

  return bundler.bundle()
    .on('error', handleError)
    .pipe(source('vendor.js'))
    .pipe(buffer()).pipe(uglify())
    .pipe(gulp.dest(path.join(PROJECT_STATIC, 'scripts')));
});

function createScriptBundles(watch) {
  SCRIPTS.map(function(script) { createScriptBundle(script, watch); });
}

function createScriptBundle(item, watch) {

  var options = {
    debug: true,
    cache: {},
    packageCache: {},
    extensions: ['.js', '.jsx'],
  }

  var bundler = browserify(item.entry, options)
    .transform(babelify);

  if (item.external) {
    item.external.map(function (id) {
      bundler.external(id);
    });
  }

  if (watch) {
    bundler = watchify(bundler)
      .on('log', gutil.log)
      .on('update', bundle);
  }

  function bundle() {
    bundler.bundle()
      .on('error', handleError)
      .pipe(source(item.target))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(path.join(PROJECT_STATIC, 'scripts')))
      .pipe(browserSync.stream({match: '**/*.js'}));
  }

  return bundle();
}

// ----------------------------------------------------------------------------
// Utils

var handleError = function(error) {
    gutil.beep();
    gutil.log(gutil.colors.red('Error'), error.message);
    this.emit('end');
};

// ----------------------------------------------------------------------------
