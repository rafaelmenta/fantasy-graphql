import express from 'express';

const app = express(),
      env = app.get('env') || 'local',
      config = require(`./env/${env}`);

export default config;
