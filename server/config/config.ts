import dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV;

if (nodeEnv === 'dev') {
  dotenv.config({ path: '.env.dev' });
} else if (nodeEnv === 'prod') {
  dotenv.config({ path: '.env.prod' });
} else {
  dotenv.config();
}

/**
 * Configuration object for the server.
 */
export const config = {
  /**
   * The current environment of the server.
   */
  NODE_ENV: process.env.NODE_ENV,

  /**
   * The port number on which the server will listen.
   */
  PORT: process.env.PORT,

  /**
   * The prefix for the database.
   */
  DB_PREFIX: process.env.DB_PREFIX,

  /**
   * The username for the database.
   */
  DB_USERNAME: process.env.DB_USERNAME,

  /**
   * The password for the database, encoded using encodeURIComponent.
   */
  DB_PASSWORD: encodeURIComponent(process.env.DB_PASSWORD),

  /**
   * The cluster for the database.
   */
  DB_CLUSTER: process.env.DB_CLUSTER,

  /**
   * The number of salt rounds for password hashing.
   * Defaults to '10' if not provided.
   */
  SALT_ROUNDS: '10',
};
