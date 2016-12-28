import Sequelize from 'Sequelize';
import Conn from '../database/connection';

const PlayerPerformance = Conn.define('player_performance', {
  
  id_player_performance : {
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
  minutes : Sequelize.INTEGER,
  field_goal_attempts : Sequelize.INTEGER,
  free_throw_attempts : Sequelize.INTEGER,
  points : Sequelize.INTEGER,
  defensive_rebounds : Sequelize.INTEGER,
  offensive_rebounds : Sequelize.INTEGER,
  assists : Sequelize.INTEGER,
  steals : Sequelize.INTEGER,
  blocks : Sequelize.INTEGER,
  turnovers : Sequelize.INTEGER,
  personal_fouls : Sequelize.INTEGER,
  win_loss : Sequelize.INTEGER,
  fantasy_points : Sequelize.DECIMAL
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true
});

export default PlayerPerformance;