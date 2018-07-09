import DivisionType from '../../object-types/division';
import {Division} from '../../../model/setup';
import Conn from '../../../database/connection';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;


const DivisionQuery = {
  divisions: {
    type: new GraphQLList(DivisionType),
    resolve: resolver(Division)
  },
  league_divisions: {
    type: new GraphQLList(DivisionType),
    args: {
      id_league: { type: GraphQLInt },
    },
    resolve: (root, {id_league}) => Conn.query(`
      SELECT d.*
      FROM division d
      JOIN conference c on d.id_conference=c.id_conference
      WHERE c.id_league=${id_league};
    `, {model: Division}),
  }
};

export default DivisionQuery;
