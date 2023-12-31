import dotenv from 'dotenv';

dotenv.config();

const config = {
  database: {
    port: Number(process.env.MARIADB_PORT),
    username: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.MARIADB_DATABASE,
    host: process.env.MARIADB_HOST,
    dialect: 'mariadb' as const,
    autoLoadModels: true,
    synchronize: true,
    logging: false,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
};

export default config;
