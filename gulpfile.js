const gulp = require("gulp");
const less = require("gulp-less");
const autoprefixer = require('gulp-autoprefixer');
const uglifycss = require('gulp-uglifycss');
const htmlmin = require('gulp-htmlmin');
const rev = require('gulp-rev');
const through = require('through2');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

gulp.task("less", () => {
  return gulp
    .src(["**/*.less", "!{dist,node_modules}/**/*.less"])
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],  // https://github.com/browserslist/browserslist#queries
    }))
    .pipe(uglifycss())
    .pipe(rev())
    .pipe(gulp.dest("dist"))  // 写入处理过后的文件
    .pipe(rev.manifest())
    .pipe(gulp.dest("dist"))  // 写入 rev-manifest.json 文件
});

gulp.task("html", ['less'], () => {
  gulp
    .src(["**/*.html", "!{dist,node_modules}/**/*.html"])
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(replace())
    .pipe(gulp.dest("dist"));
});

gulp.task("static", () => {
  gulp.src("static/**/*").pipe(gulp.dest("dist/static"));
});

gulp.task("default", ["html", "static"], () => {
  // gulp.watch(["**/*.less", "!{dist,node_modules}/**/*.less"], ["less"]);
  gulp.watch(["**/*.{html,less}", "!{dist,node_modules}/**/*.{html,less}"], ["html"]);
});

gulp.task("del", () => {
  return new Promise(res => {
    rimraf('dist', () => {
      res();
    });
  }) 
})

gulp.task("b", ['del', 'static', 'html'])

function replace() {
  const { dirname, basename } = path;
  const conf = JSON.parse(fs.readFileSync('dist/rev-manifest.json'));
  return through.obj(function (file, enc, cb) {
    if (file.isBuffer()) {
      for (const origin in conf) {
        const revPath = conf[origin];
        if (conf.hasOwnProperty(origin) &&
          dirname(file.path).endsWith(dirname(origin)) &&
          basename(revPath).endsWith('.css')
        ) {
          file.contents = Buffer.from(file.contents.toString().replace(basename(origin), basename(revPath)));
        }
      }
    }
    this.push(file);
    return cb();
  });
}