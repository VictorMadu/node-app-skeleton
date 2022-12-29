import dotenv from 'dotenv';
import path from 'path';
import rootDir from '../root-dir';

dotenv.config();

export default class Config {
    allowedOrigins = new Set(process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()));
    port = +(process.env.PORT as string);
    rootDir = rootDir;
    dbLocation = path.join(rootDir, process.env.DB_LOCATION as string);
}
