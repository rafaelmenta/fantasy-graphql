const Conn = require('../database/connection'),
      Sequelize = require('sequelize'),
      UserTeam = require('./associations/user-team');

import User from './user';


const TeamSl = Conn.define('team_sl', {
  id_sl : {
    type :Sequelize.INTEGER,
    primaryKey : true
  },
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