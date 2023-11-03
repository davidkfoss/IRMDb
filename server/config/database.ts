import { config } from './config';

export const database = {
  MongoURI: `mongodb://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_CLUSTER}`,
};
