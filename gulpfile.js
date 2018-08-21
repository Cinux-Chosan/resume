const gulp = require("gulp");
const less = require("gulp-less");
const handlebars = require("gulp-handlebars");
const wrap = require("gulp-wrap");
const declare = require("gulp-declare");
const concat = require("gulp-concat");
var defineModule = require("gulp-define-module");

// gulp.task("templates", () => {
//   gulp
//     .src(["src/templates/**/*.hbs"])
//     .pipe(handlebars())
//     .pipe(defineModule("node"))
//     .pipe(gulp.dest("build/templates/"));
// });

// gulp.task("components", () => {
//   gulp.src('')
// })

gulp.task("html", () => {
  gulp.src("*.html").pipe(gulp.dest("dist"));
});
gulp.task("less", () => {
  gulp
    .src("less/*.less")
    .pipe(less())
    .pipe(gulp.dest("dist/css"));
});

gulp.task("static", () => {
  gulp.src("static/**/*").pipe(gulp.dest("dist/static"));
});
gulp.task("default", ["html", "less", "static"], () => {
  gulp.watch("less/*.less", ["less"]);
  gulp.watch("*.html", ["html"]);
});
