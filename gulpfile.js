const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const uglifycss = require('gulp-uglifycss');
const htmlmin = require('gulp-htmlmin');
const rev = require('gulp-rev');
const through = require('through2');
const fs = require('fs');
const { dirname, basename } = require('path');
const rimraf = require('rimraf');
const puppeteer = require('puppeteer');
const glob = require('glob');

gulp.task('less', buildLess);
gulp.task('html', ['less'], buildHTML);
gulp.task('static', buildStatic);
gulp.task('default', ['html', 'static'], () => {
  gulp.watch(['**/*.{html,less}', '!{dist,node_modules}/**/*.{html,less}'], ['html']);
});

gulp.task('delDist', cb => rimraf('dist', cb))

// build
gulp.task('b', ['delDist'], () => {
  buildStatic();
  buildLess().on('finish', () => {
    buildHTML().on('finish', () => {
      createPDF();
    });
  });
})

gulp.task('pdf', ['html', 'static'], createPDF)

function buildLess() {
  return gulp
    .src(['**/*.less', '!{dist,node_modules}/**/*.less'])
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],  // https://github.com/browserslist/browserslist#queries
    }))
    .pipe(uglifycss())
    .pipe(rev())
    .pipe(gulp.dest('dist'))  // 写入处理过后的文件
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist'))  // 写入 rev-manifest.json 文件
}

function buildHTML() {
  return gulp
    .src(['**/*.html', '!{dist,node_modules}/**/*.html'])
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(replace())
    .pipe(gulp.dest('dist'));
}

function buildStatic() {
  return gulp.src('static/**/*').pipe(gulp.dest('dist/static'));
}

async function createPDF() {
  let browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_PATH,
  });
  let page = await browser.newPage();
  await page.emulateMedia('print');
  glob('dist/**/*.html', { absolute: true }, async (err, files) => {
    let file = null;
    while (file = files.pop()) {
      await page.goto(file);
      await page.pdf({
        path: file.replace(/\.[a-z]+$/, '.pdf'),
        printBackground: true,
        format: 'A4',
        preferCSSPageSize: true,
      })
    }
    browser.close();
  })
}

function replace() {
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