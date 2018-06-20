import Sequelize from 'sequelize';
import Conn from '../database/connection';

const PlayerTeamPerformance = Conn.define('player_team_performance', {

  ptp_code : {
    type: Sequelize.INTEGER,
    primaryKey : true
  },
  id_player : {
    type: Sequelize.INTEGER,
    references : {
      model: 'player',
      key : 'id_player'
    }
  },
  id_round : {
    type: Sequelize.INTEGER,
    references : {
      model : 'round',
      key : 'id_round'
    }
  },
  id_sl : {
    type: Sequelize.INTEGER,
    references : {
      model : 'team_sl',
      key : 'id_sl'
    }
  },
  fantasy_points : Sequelize.DECIMAL,
  order : Sequelize.INTEGER,
  primary_position : Sequelize.STRING,
  secondary_position : Sequelize.STRING,
  minutes_primary :  Sequelize.INTEGER,
  minutes_secondary :  Sequelize.INTEGER,
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true
});

export default PlayerTeamPerformance;
