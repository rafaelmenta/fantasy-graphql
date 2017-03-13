import Conn from '../../database/connection';
import Sequelize from 'sequelize';

const PlayerTrade = Conn.define('player_trade', {
  ptr_code : {
    autoIncrement: true,
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
  id_player : {
    type: Sequelize.INTEGER,
    references: {
      model: 'player',
      key: 'id_player'
    }
  },
  is_sender : Sequelize.BOOLEAN,
}, {
  freezeTableName : true,
  updatedAt: false,
  createdAt: false
});

export default PlayerTrade;
