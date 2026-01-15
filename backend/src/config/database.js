const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Conexão com banco de dados estabelecida com sucesso.');
    await sequelize.sync();
    console.log('✓ Modelos sincronizados com o banco de dados.');
  } catch (error) {
    console.error('✗ Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDatabase };
