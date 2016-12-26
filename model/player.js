import Sequelize from 'Sequelize';
import Conn from '../database/connection';

const Player = Conn.define('player', {
  id_player : {
    type :Sequelize.INTEGER,
    primaryKey : true
  },
  first_name : Sequelize.STRING,
  last_name : Sequelize.STRING,
  id_nba : {
    type : Sequelize.INTEGER,
    references: {
      model: 'team_nba',
      key: 'id_nba'
    }
  },
  default_primary : {
    type: Sequelize.STRING,
    field: 'primary_position'
  },
  default_secondary : {
    type: Sequelize.STRING,
    field: 'secondary_position'
  },
  // primary_position : Sequelize.STRING,
  // secondary_position : Sequelize.STRING,
  player_slug : Sequelize.STRING,
  retired : Sequelize.BOOLEAN,
  rookie : Sequelize.BOOLEAN,
  birthdate : Sequelize.DATE,
  contract_salary : Sequelize.DECIMAL,
  contract_years : Sequelize.INTEGER
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true
});

export default Player;