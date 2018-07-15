import Sequelize from 'sequelize';
import env from '../config';

const config = env.config;

// @TODO move out later
Date.prototype.stdTimezoneOffset = function() {
  var jan = new Date(this.getFullYear(), 0, 1);
  var jul = new Date(this.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.dst = function() {
  return this.getTimezoneOffset() < this.stdTimezoneOffset();
};

let now = new Date();
let timezone = now.dst() ? '-4:00' : '-5:00'

const Conn = new Sequelize(
  config.database.name,
  config.database.login,
  config.database.password,
  {
    logging: false,
    benchmark: false,
    host: config.database.host,
    dialect: config.database.dialect,
    timezone: timezone,
    dialectOptions: {
      socketPath: config.database.socketPath,
      multipleStatements: true,
    }
  }
);

export default Conn;