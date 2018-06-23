import Sequelize from 'sequelize';
import Conn from '../database/connection';

const Round = Conn.define('round', {
  id_round : {
    type :Sequelize.INTEGER,
    primaryKey : true
  },
  description : Sequelize.STRING,
  round_number : Sequelize.INTEGER,
  id_season : {
    type : Sequelize.INTEGER,
    references: {
      model: 'season',
      key: 'id_season'
    }
  },
  open_date : Sequelize.DATE,
  close_date : Sequelize.DATE,
  processed : Sequelize.BOOLEAN
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true
});

export default Round;