import Conn from '../../database/connection';
import Sequelize from 'sequelize';

export const Taxonomy = Conn.define('taxonomy', {
  tax_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  slug : {
    type: Sequelize.STRING,
    unique: true,
  },
  id : Sequelize.INTEGER,
}, {
  freezeTableName : true,
  updatedAt: false,
  createdAt: false
});
