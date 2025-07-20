const { Sequelize } = require('sequelize');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const sequelize = new Sequelize(
  process.env.DOCKER_NAME,
  process.env.DOCKER_USER,
  process.env.DOCKER_PASSWORD,
  {
    host: 'localhost',
    port: process.env.DOCKER_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize; 