import Sequelize from 'sequelize';
import Conn from '../database/connection';

const Division = Conn.define('division', {
  id_division : {
    type :Sequelize.INTEGER,
    primaryKey : true
  },
  name : Sequelize.STRING,
  symbol : Sequelize.STRING,
  id_conference : {
    type : Sequelize.INTEGER,
    references: {
      model: 'conference',
      key: 'id_conference'
    }
  }
}, {
  updatedAt : false,
  createdAt : false,
  freezeTableName: true
});

export default Division;