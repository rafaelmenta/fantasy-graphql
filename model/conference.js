import Sequelize from 'sequelize';
import Conn from '../database/connection';

const Conference = Conn.define('conference', {
  id_conference : {
    type : Sequelize.INTEGER,
    primaryKey : true
  },
  name : Sequelize.STRING,
  symbol : Sequelize.STRING,
  id_league : {
    type : Sequelize.INTEGER,
    references: {
      model: 'league',
      key: 'id_league'
    }
  }
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true
});

export default Conference;