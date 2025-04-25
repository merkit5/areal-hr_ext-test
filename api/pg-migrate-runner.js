const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { execSync } = require('child_process');

const command = process.argv[2] || 'up';

try {
  execSync(`node-pg-migrate ${command} -m migrations`, {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    },
  });
} catch (error) {
  console.error(error);
}
