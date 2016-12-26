import Sequelize from 'Sequelize';
import Conn from '../database/connection';

const Season = Conn.define('season', {
  id_season : {
    type :Sequelize.INTEGER,
    primaryKey : true
  },
  year : Sequelize.STRING,
  current : Sequelize.BOOLEAN
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true
});

export default Season;