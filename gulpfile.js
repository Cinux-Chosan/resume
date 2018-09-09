const fs = require('fs')
const glob = require('glob')
const gulp = require('gulp')
const rev = require('gulp-rev')
const rimraf = require('rimraf')
const less = require('gulp-less')
const through = require('through2')
const puppeteer = require('puppeteer')
const htmlmin = require('gulp-htmlmin')
const uglifycss = require('gulp-uglifycss')
const { dirname, basename } = require('path')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('less', buildLess);
gulp.task('html', ['less'], buildHTML);
gulp.task('static', buildStatic);
gulp.task('pdf', ['html', 'static'], createPDF);
gulp.task('delDist', cb => rimraf('dist', cb));
gulp.task('default', ['html', 'static'], () => gulp.watch(['**/*.{html,less}', '!{dist,node_modules}/**/*.{html,less}'], ['html']));

// build
gulp.task('b', ['delDist'], () => {
  buildStatic().on('finish', () => {
    buildLess().on('finish', () => {
      buildHTML().on('finish', () => {
        createPDF();
      });
    });
  })
});

function buildLess() {
  return gulp.src(['**/*.less', '!{dist,node_modules}/**/*.less'])
    .pipe(less())
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))  // https://github.com/browserslist/browserslist#queries
    .pipe(uglifycss())
    .pipe(rev())
    .pipe(gulp.dest('dist'))  // 写入处理过后的文件
    .pipe(rev.manifest('dist/rev-manifest.json', {
      base: 'dist',
      merge: true
    }))
    .pipe(gulp.dest('dist'))  // 写入 rev-manifest.json 文件
}

function buildHTML() {
  return gulp.src(['**/*.html', '!{dist,node_modules}/**/*.html'])
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(replace())
    .pipe(gulp.dest('dist'));
}

function buildStatic() {
  return gulp.src('static/**/*')
    .pipe(rev())
    .pipe(gulp.dest('dist/static'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist'));
}

async function createPDF() {
  const browser = await puppeteer.launch({ executablePath: process.env.PUPPETEER_PATH, });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => window.globalTimeFormat = new Date().toLocaleString());
  await page.emulateMedia('print');
  glob('dist/**/*.html', { absolute: true }, async (err, files) => {
    let file = null;
    while (file = files.pop()) {
      await page.goto(`file://${file}`);
      await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        path: file.replace(/\.[a-z]+$/, '.pdf'),
      });
    }
    browser.close();
  })
}

function replace() {
  const conf = JSON.parse(fs.readFileSync('dist/rev-manifest.json') || {});
  return through.obj(function (file, enc, cb) {
    if (file.isBuffer()) {
      let strFileContents = file.contents.toString().replace('{{pageFooterText}}', `来自 https://chosan.cn/resume/v2/resume.html ${new Date().toLocaleDateString()}`)
      for (const origin in conf) {
        const revPath = conf[origin];
        const revBase = basename(revPath);
        const originBase = basename(origin);
        const fileDir = dirname(file.path);
        const originDir = dirname(origin);
        if (conf.hasOwnProperty(origin) && (fileDir.endsWith(originDir) || originDir.match(/(\.|less)$/))) {
          strFileContents = strFileContents.replace(originBase, revBase);
        }
      }
      file.contents = Buffer.from(strFileContents);
    }
    this.push(file);
    return cb();
  });
}