import Sequelize from 'Sequelize';
import Conn from '../database/connection';

const League = Conn.define('league', {
  id_league : {
    type : Sequelize.INTEGER,
    primaryKey : true
  },
  name : Sequelize.STRING,
  symbol : Sequelize.STRING,
  id_owner : {
    type : Sequelize.INTEGER,
    references: {
      model: 'user',
      key: 'id_user'
    }
  },
  id_type : Sequelize.INTEGER,
  number_of_teams : Sequelize.INTEGER
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true
});

export default League;