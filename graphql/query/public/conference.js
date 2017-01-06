import ConferenceType from '../../object-types/conference';
import {Conference} from '../../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;


const ConferenceQuery = {
  conferences: {
   type: new GraphQLList(ConferenceType),
    resolve: resolver(Conference)
  }
};

export default ConferenceQuery;
