import {TeamPlayer} from '../../model/setup';

import TeamType from './team-sl'

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} =  graphql;

const TeamPlayerType = new GraphQLObjectType({
  name: 'TeamPlayer',
  fields: () => ({
    tp_code: { type: GraphQLInt, },
    id_sl: { type: GraphQLInt, },
    id_player: { type: GraphQLInt, },
    order: { type: GraphQLInt, },
    primary_position: { type: GraphQLString, },
    secondary_position : { type : GraphQLString },

    team: {
      type : TeamType,
      resolve: resolver(TeamPlayer.TeamSl)
    }
  })
});

export default TeamPlayerType;
