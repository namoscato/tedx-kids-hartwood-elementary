const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const eslint = require('gulp-eslint')
const gulp = require('gulp')
const pipeline = require('readable-stream').pipeline
const uglify = require('gulp-uglify')

const config = {
    css: 'src/css/style.css',
    dest: 'static',
    js: 'src/js/*.js'
}

function css() {
    return gulp.src(config.css)
        .pipe(cleanCSS())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest(config.dest))
}

function js() {
    return pipeline(
        gulp.src(config.js),
        uglify(),
        concat('all.min.js'),
        gulp.dest(config.dest)
    )
}

function jsLint() {
    return gulp.src(config.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
}

function watch() {
    gulp.watch(config.css, css)
    gulp.watch(config.js, gulp.parallel(js, jsLint))
}

exports.css = css
exports.js = js
exports.lint = jsLint
exports.watch = watch

const all = gulp.parallel(css, js)

exports.all = all
exports.default = gulp.series(all, watch)
