module.exports = {
  apps : [{
    script: './bin/www',
    watch: '.',
    env : {
      NODE_ENV: 'development',
      DEBUG: 'checklists-node:*'
    }
  }]
};