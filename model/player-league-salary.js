import Sequelize from 'sequelize';
import Conn from '../database/connection';

export const PlayerLeagueSalary = Conn.define('player_league_salary', {
  pls_code: {
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
  id_player: {
    type: Sequelize.INTEGER,
    references: {
      model: 'player',
      key: 'id_player',
    },
  },
  contract_salary: Sequelize.DECIMAL,
  contract_years: Sequelize.INTEGER,
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});