# 简历项目简单介绍

## 所用到的技术

### [Gulp](https://gulpjs.com/)

用于本项目的构建

### [Less](http://lesscss.org/)

CSS 预处理器

### [Autoprefixer](https://www.npmjs.com/package/autoprefixer)

CSS 兼容预处理

### [Puppeteer](https://github.com/GoogleChrome/puppeteer)

网页转 PDF 文件（针对该功能有其它更好方案，个人更喜欢 pupeteer 来做）

### [Iconfont](http://www.iconfont.cn/)

阿里的图标库

## 项目优化方案

- 使用 Convert 库对图片进行处理和压缩，处理前 235 K 处理后 34 K，节省流量 85%（未做雪碧图）
- 代码预处理、压缩
  - 使用 htmlmin 压缩 HTML 代码
  - 使用 uglifycss 消除注释、压缩 CSS 代码
- 服务器开启 gzip 压缩（现代浏览器基本都支持 gzip 压缩）
- 开启 cache-control 和 Etag，配置缓存策略
- 公共资源分离，适合缓存
- 使用 gulp-rev 对资源添加指纹，解决缓存未过期问题
