import Sequelize from 'sequelize';
import Conn from '../database/connection';

const Trade = Conn.define('trade', {
  id_trade : {
    autoIncrement: true,
    type :Sequelize.INTEGER,
    primaryKey : true
  },
  id_sender : {
    type : Sequelize.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_receiver : {
    type : Sequelize.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  status_trade : Sequelize.INTEGER,
  trade_comment : Sequelize.TEXT,
  last_change : Sequelize.DATE,
  views : Sequelize.INTEGER

}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true
});

export default Trade;
