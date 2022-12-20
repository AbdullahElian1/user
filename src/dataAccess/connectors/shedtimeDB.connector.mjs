import Sequelize from 'sequelize';

export const DBConnector = new Sequelize(AppConfigs.connections.db);
