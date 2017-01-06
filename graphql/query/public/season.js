import SeasonType from '../../object-types/season';
import {Season} from '../../../model/setup';

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
  }
};

export default SeasonQuery;
