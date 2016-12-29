import DraftType from './draft';
import TeamSlType from './team-sl';
import { Pick } from '../../model/Setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} =  graphql;

const PickType = new GraphQLObjectType({
  name: 'Pick',
  fields: () => ({
    id_pick: {
      type: GraphQLInt,
    },
    id_sl_original: {
      type: GraphQLInt,
    },
    id_owner: {
      type: GraphQLInt,
    },
    id_draft: {
      type: GraphQLInt,
    },
    round : {
      type: GraphQLInt,
    },
    order : {
      type: GraphQLInt,
    },
    deadline : {
      type : GraphQLInt
    },
    is_used : {
      type : GraphQLBoolean
    },
    id_player : {
      type : GraphQLInt
    },
    draft: {
      type: DraftType,
      resolve: resolver(Pick.Draft)
    },
    owner: {
      type: TeamSlType,
      resolve: resolver(Pick.Owner)
    },
    original: {
      type: TeamSlType,
      resolve: resolver(Pick.Original)
    }
  })
});

export default PickType;