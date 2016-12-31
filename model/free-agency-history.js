import Conn from '../database/connection';
import Sequelize from 'sequelize';


const FreeAgencyHistory = Conn.define('free_agency_history', {
  fah_code : {
    type :Sequelize.INTEGER,
    primaryKey : true
  },
  id_player : {
    type : Sequelize.INTEGER,
    references : {
      model : 'player',
      key : 'id_player'
    }
  },
  id_sl : {
    type : Sequelize.INTEGER,
    references : {
      model : 'team_sl',
      key : 'id_sl'
    }
  },
  event_date : Sequelize.DATE,
  action : Sequelize.STRING,
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true
});

export default FreeAgencyHistory;
