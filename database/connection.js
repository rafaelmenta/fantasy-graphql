import Sequelize from 'sequelize';

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
  'api_dev',
  'apidev',
  'n01sf4zap4i!!',
  {
    host: '50.116.45.45',
    dialect: 'mysql',
    timezone: timezone
  }
);

export default Conn;