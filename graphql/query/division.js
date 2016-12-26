import DivisionType from '../object-types/division';
import {Division} from '../../model/setup';

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
  }
};

export default DivisionQuery;
