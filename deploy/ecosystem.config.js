module.exports = {
  apps: [
    {
      name: 'me-retrouver',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/opt/me-retrouver',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Logs
      error_file: '/home/deploy/.pm2/logs/me-retrouver-error.log',
      out_file: '/home/deploy/.pm2/logs/me-retrouver-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      // Restart auto en cas de crash
      max_restarts: 5,
      restart_delay: 3000,
      // Mémoire max (optionnel, évite les fuites)
      max_memory_restart: '300M',
    },
  ],
};
