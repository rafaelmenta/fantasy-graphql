import Conn from '../../database/connection';
import Sequelize from 'sequelize';

const LeagueConfig = Conn.define('league_config', {
  id_config : {
    type: Sequelize.STRING,
    primaryKey: true
  },
  id_league : {
    type: Sequelize.INTEGER,
    primaryKey : true,
    references: {
      model: 'league',
      key: 'id_league'
    }
  },
  config_value : Sequelize.STRING,
}, {
  freezeTableName : true,
  updatedAt: false,
  createdAt: false
});

export default LeagueConfig;
