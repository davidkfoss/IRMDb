import dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV;

// Load the appropriate .env file based on NODE_ENV
if (nodeEnv === 'dev') {
  dotenv.config({ path: '.env.dev' });
} else if (nodeEnv === 'prod') {
  dotenv.config({ path: '.env.prod' });
} else {
  // Default to '.env'
  dotenv.config();
}

export const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB_PREFIX: process.env.DB_PREFIX,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: encodeURIComponent(process.env.DB_PASSWORD),
  DB_CLUSTER: process.env.DB_CLUSTER,
};
