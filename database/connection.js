import Sequelize from 'sequelize';

const Conn = new Sequelize(
  'api_dev',
  'apidev',
  'n01sf4zap4i!!',
  {
    host: '50.116.45.45',
    dialect: 'mysql'
  }
);

export default Conn;