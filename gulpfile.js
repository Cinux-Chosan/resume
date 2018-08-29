const gulp = require("gulp");
const less = require("gulp-less");

gulp.task("html", () => {
  gulp
    .src(["**/*.html", "!{dist,node_modules}/**/*.html"])
    .pipe(gulp.dest("dist"));
});

gulp.task("less", () => {
  gulp
    .src(["**/*.less", "!{dist,node_modules}/**/*.less"])
    .pipe(less())
    .pipe(gulp.dest("dist"));
});

gulp.task("static", () => {
  gulp.src("static/**/*").pipe(gulp.dest("dist/static"));
});

gulp.task("default", ["html", "less", "static"], () => {
  gulp.watch(["**/*.less", "!{dist,node_modules}/**/*.less"], ["less"]);
  gulp.watch(["**/*.html", "!{dist,node_modules}/**/*.html"], ["html"]);
});

