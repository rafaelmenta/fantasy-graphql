import Sequelize from 'sequelize';
import Conn from '../database/connection';

export const PlayerBid = Conn.define('player_bid', {
  id_bid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_auction: {
    type: Sequelize.INTEGER,
    references: {
      model: 'auction',
      key: 'id_auction',
    },
  },
  id_player: {
    type: Sequelize.INTEGER,
    references: {
      model: 'player',
      key: 'id_player',
    },
  },
  id_sl: {
    type: Sequelize.INTEGER,
    references: {
      model: 'team_sl',
      key: 'id_sl',
    },
  },
  salary: Sequelize.DECIMAL,
  years: Sequelize.INTEGER,
  expiration: Sequelize.DATE,
  processed: Sequelize.BOOLEAN,
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});