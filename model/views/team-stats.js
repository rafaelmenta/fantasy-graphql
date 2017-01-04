import Sequelize from 'Sequelize';
import Conn from '../../database/connection';

const TeamStats = Conn.define('team_stats', {

  id_sl : {
    type: Sequelize.INTEGER,
    primaryKey : true,
    references : {
      model: 'team_sl',
      key : 'id_sl'
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
  minutes_pg : Sequelize.INTEGER,
  minutes_sg : Sequelize.INTEGER,
  minutes_sf : Sequelize.INTEGER,
  minutes_pf : Sequelize.INTEGER,
  minutes_c : Sequelize.INTEGER,
  fantasy_points : Sequelize.DECIMAL
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true
});

export default TeamStats;
