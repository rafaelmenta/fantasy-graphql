import Conn from '../../database/connection';
import Sequelize from 'sequelize';

const PlayerTrade = Conn.define('pick_trade', {
  pct_code : {
    type : Sequelize.INTEGER,
    primaryKey : true
  },
  id_trade : {
    type: Sequelize.INTEGER,
    references: {
      model: 'trade',
      key: 'id_trade'
    }
  },
  id_pick : {
    type: Sequelize.INTEGER,
    references: {
      model: 'pick',
      key: 'id_pick'
    }
  },
  is_sender : Sequelize.BOOLEAN,
}, {
  freezeTableName : true,
  updatedAt: false,
  createdAt: false
});

export default PlayerTrade;