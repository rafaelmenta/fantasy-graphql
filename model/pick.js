import Sequelize from 'sequelize';
import Conn from '../database/connection';

const Pick = Conn.define('pick', {
  id_pick : {
    type :Sequelize.INTEGER,
    primaryKey : true,
    autoIncrement: true,
  },
  id_sl_original : {
    type : Sequelize.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_owner : {
    type : Sequelize.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl'
    }
  },
  id_draft : {
    type : Sequelize.INTEGER,
    references: {
      model: 'draft',
      key: 'id_draft'
    }
  },
  round : Sequelize.INTEGER,
  order : Sequelize.INTEGER,
  deadline : Sequelize.DATE,
  is_used : Sequelize.BOOLEAN,
  id_player : Sequelize.INTEGER,
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true
});

export default Pick;