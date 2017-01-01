import {Season} from '../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} =  graphql;

const LeagueConfigType = new GraphQLObjectType({
  name: 'LeagueConfig',
  fields: () => ({
    id_config: {
      type: GraphQLString,
    },
    config_value: {
      type: GraphQLString,
    }
  })
});

export default LeagueConfigType;
