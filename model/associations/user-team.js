import Conn from '../../database/connection';
import Sequelize from 'sequelize';

const UserTeam = Conn.define('user_team', {
  ut_code : {
    type : Sequelize.INTEGER,
    primaryKey : true
  },
  id_sl : {
    type: Sequelize.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_user : {
    type: Sequelize.INTEGER,
    references: {
      model: 'user',
      key: 'id_user'
    }
  }
}, {
  freezeTableName : true,
  updatedAt: false,
  createdAt: false
});

export default UserTeam;