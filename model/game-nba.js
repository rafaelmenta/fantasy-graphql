import Sequelize from 'Sequelize';
import Conn from '../database/connection';

const GameNba = Conn.define('game_nba', {
  id_game_nba : {
    type :Sequelize.INTEGER,
    primaryKey : true
  },
  id_away : {
    type : Sequelize.INTEGER,
    references : {
      model : 'team_nba',
      key : 'id_nba'
    }
  },
  id_home : {
    type : Sequelize.INTEGER,
    references : {
      model : 'team_nba',
      key : 'id_nba'
    }
  },
  id_round_away : {
    type : Sequelize.INTEGER,
    references: {
      model: 'round',
      key: 'id_round'
    }
  },
  id_round_home : {
    type : Sequelize.INTEGER,
    references: {
      model: 'round',
      key: 'id_round'
    }
  },
  game_time : {
    type : Sequelize.INTEGER
  },
  is_finished : Sequelize.BOOLEAN,
  external_id : Sequelize.STRING
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true
});

export default GameNba;