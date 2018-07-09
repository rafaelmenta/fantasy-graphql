import SeasonType from '../../object-types/season';
import {Season} from '../../../model/setup';
import Conn from '../../../database/connection';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;


const SeasonQuery = {
  season: {
    type : SeasonType,
    resolve : resolver(Season),
    args: {
      id_season: {
        name : 'id_season',
        type : new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  current_season : {
    type: SeasonType,
    resolve : Season.Current
  },
  seasons: {
   type: new GraphQLList(SeasonType),
   resolve: resolver(Season)
  },
  available_seasons: {
    type: new GraphQLList(SeasonType),
    resolve: () => Conn.query(`
      SELECT *
      FROM season a
      WHERE a.id_season >= (
        SELECT id_season
        FROM season b
        WHERE b.current = true)
    `, {model: Season}),
  }
};

export default SeasonQuery;
