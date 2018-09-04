module.exports = {
  deploy: {
    prod: {
      user: 'root',
      host: 'chosan.cn',
      ref: 'origin/master',
      repo: 'https://github.com/Cinux-Chosan/resume.git',
      path: '/zhangjianjun/resume',
      'pre-deploy-local': 'gulp b; git add -A; git commit -m preDeployLocal; git push',
      'post-deploy': 'git pull; pwd | xargs -i ln -sf {}/dist /zhangjianjun/statics/resume'
    }
  }
};
