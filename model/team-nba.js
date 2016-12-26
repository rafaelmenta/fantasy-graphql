import Conn from '../database/connection';
import Sequelize from 'sequelize';
import UserTeam from './associations/user-team';
import User from './user';


const TeamNba = Conn.define('team_nba', {
  id_nba : {
    type :Sequelize.INTEGER,
    primaryKey : true
  },
  city : Sequelize.STRING,
  nickname : Sequelize.STRING,
  symbol : Sequelize.STRING,
  primary_color : Sequelize.STRING,
  secondary_color : Sequelize.STRING,
  slug : Sequelize.STRING,
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true
});

export default TeamNba;