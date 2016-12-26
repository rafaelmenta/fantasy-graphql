import RoundType from '../object-types/round';
import {Round} from '../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;


const RoundQuery = {
  rounds: {
   type: new GraphQLList(RoundType),
    resolve: resolver(Round)
  }
};

export default RoundQuery;
