const Sequelize = require('Sequelize'),
      Conn = require('../database/connection'),
      UserTeam = require('./associations/user-team');

      import TeamSl from './team-sl';

const User = Conn.define('user', {
  id_user : {
    type :Sequelize.INTEGER,
    primaryKey : true
  },
  first_name : Sequelize.STRING,
  last_name : Sequelize.STRING,
  nickname : Sequelize.STRING,
  email : Sequelize.STRING,
  login : Sequelize.STRING,
  password : Sequelize.STRING,
  id_permission : Sequelize.INTEGER
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true // Model tableName will be the same as the model name
});

export default User;