import DraftType from '../../object-types/draft';
import {Draft} from '../../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;


const DraftQuery = {
  draft : {
    type: DraftType,
    resolve : resolver(Draft),
    args : {
      id_draft : {
        name : 'id_draft',
        type : new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  drafts: {
    type: new GraphQLList(DraftType),
    resolve: resolver(Draft),
    args : {
      id_league : {
        name : 'id_league',
        type : GraphQLInt
      },
      year_draft : {
        name : 'year_draft',
        type : GraphQLInt
      }
    }
  }
};

export default DraftQuery;
