import Sequelize from 'sequelize';
import Conn from '../database/connection';

const Game = Conn.define('game', {
  id_game : {
    type :Sequelize.INTEGER,
    primaryKey : true
  },
  id_type : {
    type : Sequelize.INTEGER,
    references : {
      model : 'game_type',
      key : 'id_type'
    }
  },
  id_round : {
    type : Sequelize.INTEGER,
    references : {
      model : 'round',
      key : 'id_round'
    }
  },
  home_team : {
    type : Sequelize.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  away_team : {
    type : Sequelize.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  }
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true
});

export default Game;