const gulp = require("gulp");
const less = require("gulp-less");
const autoprefixer = require('gulp-autoprefixer');
const uglifycss = require('gulp-uglifycss');
const htmlmin = require('gulp-htmlmin');
const hash = require('gulp-hash');

gulp.task("html", () => {
  gulp
    .src(["**/*.html", "!{dist,node_modules}/**/*.html"])
    .pipe(hash({
      deleteOld: true
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("dist"));
});

gulp.task("less", () => {
  gulp
    .src(["**/*.less", "!{dist,node_modules}/**/*.less"])
    .pipe(hash({
      deleteOld: true
    }))    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],  // https://github.com/browserslist/browserslist#queries
      cascade: false
    }))
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest("dist"));
});

gulp.task("static", () => {
  gulp.src("static/**/*").pipe(gulp.dest("dist/static"));
});

gulp.task("default", ["html", "less", "static"], () => {
  gulp.watch(["**/*.less", "!{dist,node_modules}/**/*.less"], ["less"]);
  gulp.watch(["**/*.html", "!{dist,node_modules}/**/*.html"], ["html"]);
});

