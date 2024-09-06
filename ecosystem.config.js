module.exports = {
  apps: [
    {
      name: 'housesmngt2-api',
      script: 'npm',
      args: 'run dev',
      cwd: './api',
      watch: true
    },
    {
      name: 'housesmngt2-client',
      script: 'npm',
      args: 'run dev',
      cwd: './client',
      watch: true
    },
    {
      name: 'housesmngt2-admin',
      script: 'npm',
      args: 'run dev',
      cwd: './admin',
      watch: true
    }
  ]
};
