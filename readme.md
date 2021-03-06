# 简历项目简单介绍

## 所用到的技术

### [`Gulp`](https://gulpjs.com/)

用于本项目的构建

### [`Less`](http://lesscss.org/)

CSS 预处理器

### [`Autoprefixer`](https://www.npmjs.com/package/autoprefixer)

CSS 兼容预处理

### [`Puppeteer`](https://github.com/GoogleChrome/puppeteer)

网页转 PDF 文件（针对该功能有其它更好方案，个人更喜欢 pupeteer 来做）

### [`Iconfont`](http://www.iconfont.cn/)

阿里的图标库

### [`PM2`](https://pm2.io/)

项目自动化部署

## 项目优化方案

- 使用 `Convert` 库对图片进行处理和压缩，处理前 235 K 处理后 34 K，节省流量 85%（未做雪碧图），并缩减其大小，从原来的 357x479 缩减到 100x134，文件体积再从 34k 缩减为 5k，整体大小直降 230k，节约了 98% 的图像占用带宽。
  - `magick convert i_want_you.png -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace sRGB -resize 28% i_want_you_converted.jpg`
- 代码预处理、压缩
  - 使用 `htmlmin` 消除 HTML 注释、压缩 HTML 代码
  - 使用 `uglifycss` 消除 CSS 注释、压缩 CSS 代码
- iconfont 相关的 js 资源采用 async 异步加载，防止阻止 DOM 渲染
- 服务器开启 `gzip` 压缩（现代浏览器基本都支持 gzip 压缩）
- 开启 `Cache-control` 和 `Etag`，配置缓存策略
- 公共资源分离，适合缓存和资源共享
- 使用 `gulp-rev` 对资源添加指纹，解决缓存未过期问题
