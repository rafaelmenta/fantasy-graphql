import Sequelize from 'sequelize';
import Conn from '../database/connection';

const Draft = Conn.define('draft', {
  id_draft : {
    type :Sequelize.INTEGER,
    primaryKey : true,
    autoIncrement: true,
  },
  id_season : {
    type : Sequelize.INTEGER,
    references: {
      model: 'season',
      key: 'id_season'
    }
  },
  id_league : {
    type : Sequelize.INTEGER,
    references: {
      model: 'league',
      key: 'id_league'
    }
  },
  year_draft : Sequelize.INTEGER,
  status_draft : Sequelize.INTEGER,
  draft_type: Sequelize.INTEGER,
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true
});

export default Draft;