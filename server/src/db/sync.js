const sequelize = require('./index');
const models = require('../models');

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('All tables created or updated successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error syncing database:', error);
    process.exit(1);
  }
})(); 