import Conn from '../../database/connection';
import Sequelize from 'sequelize';

const TeamSeason = Conn.define('team_season', {
  ts_code : {
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
  id_season : {
    type: Sequelize.INTEGER,
    references: {
      model: 'season',
      key: 'id_season'
    }
  },
  win : Sequelize.INTEGER,
  loss : Sequelize.INTEGER,
}, {
  freezeTableName : true,
  updatedAt: false,
  createdAt: false
});

export default TeamSeason;
