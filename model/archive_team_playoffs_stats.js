import Sequelize from 'sequelize';
import Conn from '../database/connection';

export const ArchiveTeamPlayoffsStats = Conn.define('archive_team_playoffs_stats', {
  atps_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  id_sl: Sequelize.INTEGER,
  id_season: Sequelize.INTEGER,
  id_league: Sequelize.INTEGER,
  name: Sequelize.STRING,
  slug: Sequelize.STRING,
  season: Sequelize.STRING,
  win: Sequelize.INTEGER,
  loss: Sequelize.INTEGER,
  fantasy_points: Sequelize.DECIMAL,
}, {
  updatedAt: false,
  createdAt: false,
  freezeTableName: true
});