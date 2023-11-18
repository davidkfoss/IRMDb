import { config } from './config';

/**
 * Configuration object for the database.
 */
export const database = {
  /**
   * The MongoDB connection URI.
   */
  MongoURI: `${config.DB_PREFIX}${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_CLUSTER}`,
};
