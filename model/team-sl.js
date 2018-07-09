import Conn from '../database/connection';
import Sequelize from 'sequelize';
import UserTeam from './associations/user-team';
import User from './user';


const TeamSl = Conn.define('team_sl', {
  id_sl : {
    type :Sequelize.INTEGER,
    primaryKey : true
  },
  league_id: Sequelize.INTEGER,
  city : Sequelize.STRING,
  nickname : Sequelize.STRING,
  symbol : Sequelize.STRING,
  primary_color : Sequelize.STRING,
  secondary_color : Sequelize.STRING,
  id_division : Sequelize.INTEGER,
  slug : Sequelize.STRING,
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true // Model tableName will be the same as the model name
});

export default TeamSl;