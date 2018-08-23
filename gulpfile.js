const gulp = require("gulp");
const less = require("gulp-less");

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
