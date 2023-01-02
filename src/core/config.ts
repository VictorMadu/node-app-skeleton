import dotenv from 'dotenv';
import path from 'path';

if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test' });
} else {
    dotenv.config({ path: '.env' });
}

export default class Config {
    allowedOrigins = new Set(process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()));
    port = +(process.env.PORT as string);
    rootDir = path.join(__dirname, '../..');
    db = {
        skeleton: {
            path: path.join(this.rootDir, process.env.DB_LOCATION as string),
        },
    };
}
