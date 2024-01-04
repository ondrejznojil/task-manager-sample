// sync-database.ts

import { Sequelize } from 'sequelize-typescript';
import config from '../src/config/config';
import { Agent } from '../src/agent/agent.model';

async function syncDatabase() {
  const sequelize = new Sequelize({
    ...config.database,
    models: [Agent],
  });

  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();
