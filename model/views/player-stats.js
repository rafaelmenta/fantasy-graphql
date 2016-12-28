import Sequelize from 'Sequelize';
import Conn from '../../database/connection';

const PlayerStats = Conn.define('player_stats', {
  
  id_player : {
    type: Sequelize.INTEGER,
    primaryKey : true,
    references : {
      model: 'player',
      key : 'id_player'
    }
  },
  id_season : {
    type: Sequelize.INTEGER,
    primaryKey : true,
    references : {
      model : 'season',
      key : 'id_season'
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
  fantasy_points : Sequelize.DECIMAL
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true
});

export default PlayerStats;