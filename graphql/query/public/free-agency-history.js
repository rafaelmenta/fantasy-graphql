import FreeAgencyHistoryType from '../../object-types/free-agency-history';
import {FreeAgencyHistory} from '../../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;

const DEFAULT_LIMIT = 20;

const FreeAgencyHistoryQuery = {
  free_agency_history: {
    type: new GraphQLList(FreeAgencyHistoryType),
    resolve: FreeAgencyHistory.ByLeague,
    args : {
      id_league : {
        name : 'id_league',
        type: new GraphQLNonNull(GraphQLInt)
      },
      limit : {
        name : 'limit',
        type: GraphQLInt,
        defaultValue: DEFAULT_LIMIT
      }
    }
  }
};

export default FreeAgencyHistoryQuery;
