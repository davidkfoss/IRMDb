import { config } from './config';

export const database = {
  MongoURI: `${config.DB_PREFIX}${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_CLUSTER}`,
};
