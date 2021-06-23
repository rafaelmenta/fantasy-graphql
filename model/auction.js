import Sequelize from 'sequelize';
import Conn from '../database/connection';

export const Auction = Conn.define('auction', {
  id_auction: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_league: {
    type: Sequelize.INTEGER,
    references: {
      model: 'league',
      key: 'id_league',
    },
  },
  date_started: Sequelize.DATE,
  date_ended: Sequelize.DATE,
  status: Sequelize.INTEGER,
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});