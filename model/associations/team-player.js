import Conn from '../../database/connection';
import Sequelize from 'sequelize';

const TeamPlayer = Conn.define('team_player', {
  tp_code : {
    type : Sequelize.INTEGER,
    primaryKey : true
  },
  id_sl : {
    type: Sequelize.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_player : {
    type: Sequelize.INTEGER,
    references: {
      model: 'player',
      key: 'id_player'
    }
  },
  primary_position : Sequelize.STRING,
  secondary_position : Sequelize.STRING,
  order : Sequelize.INTEGER,
}, {
  freezeTableName : true,
  updatedAt: false,
  createdAt: false
});

export default TeamPlayer;