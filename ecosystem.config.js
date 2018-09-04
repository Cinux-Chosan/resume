module.exports = {
  deploy: {
    prod: {
      user: 'root',
      host: 'chosan.cn',
      ref: 'origin/master',
      repo: 'https://github.com/Cinux-Chosan/resume.git',
      path: '/zhangjianjun/resume',
      'pre-deploy-local': 'git add -A;git commit -m ..;git push',
      'post-deploy': 'git pull ; ln -sf ./dist /zhangjianjun/statics/resume'
    }
  }
};
