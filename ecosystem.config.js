module.exports = {
  deploy: {
    prod: {
      user: 'root',
      host: 'chosan.cn',
      ref: 'origin/master',
      repo: 'https://github.com/Cinux-Chosan/resume.git',
      path: '/zhangjianjun/resume',
      'post-deploy': 'git pull ; ln -sf dist /zhangjianjun/statics/resume'
    }
  }
};
