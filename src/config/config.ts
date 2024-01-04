import dotenv from 'dotenv';

dotenv.config();

const config = {
  database: {
    port: Number(process.env.PORT),
    username: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.MARIADB_DATABASE,
    host: process.env.MARIADB_HOST,
    dialect: 'mariadb' as const,
  },
};

export default config;
