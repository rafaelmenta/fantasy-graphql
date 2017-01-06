import Sequelize from 'Sequelize';
import Conn from '../database/connection';

const TeamPerformance = Conn.define('team_performance', {

  tpf_code : {
    type: Sequelize.INTEGER,
    primaryKey : true
  },
  id_sl : {
    type: Sequelize.INTEGER,
    references : {
      model: 'team_sl',
      key : 'id_sl'
    }
  },
  id_round : {
    type: Sequelize.INTEGER,
    references : {
      model : 'round',
      key : 'id_round'
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

export default TeamPerformance;
