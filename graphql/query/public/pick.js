import PickType from '../../object-types/draft';
import {Pick} from '../../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull
} =  graphql;


const PickQuery = {
  pick : {
    type: PickType,
    resolve : resolver(Pick),
    args : {
      id_draft : {
        name : 'id_draft',
        type : new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  picks: {
   type: new GraphQLList(PickType),
    resolve: resolver(Pick),
    args : {
      id_owner : {
        name : 'id_owner',
        type : GraphQLInt
      },
      id_draft : {
        name : 'id_draft',
        type : GraphQLInt
      },
      is_used : {
        name : 'is_used',
        type : GraphQLBoolean
      },
      round : {
        name : 'round',
        type : GraphQLInt
      }
    }
  }
};

export default PickQuery;
