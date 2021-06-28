import Sequelize from 'sequelize';
import Conn from '../database/connection';

export const PlayerBidHistory = Conn.define('player_bid_history', {
  id_bid_history: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_bid: {
    type: Sequelize.INTEGER,
    references: {
      model: 'player_bid',
      key: 'id_bid',
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
  bid_time: Sequelize.DATE,
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});