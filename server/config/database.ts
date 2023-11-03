import { config } from './config';

export const MongoURI = `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;
