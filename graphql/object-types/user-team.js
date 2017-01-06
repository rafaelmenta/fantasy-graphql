import TeamSlType from './team-sl';
import {TeamSl} from '../../model/setup'

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} =  graphql;

const UserTeamType = new GraphQLObjectType({
  name: 'UserTeam',
  fields: () => ({
    ut_code: { type: GraphQLInt, },
    id_sl: { type: GraphQLInt, },
    id_user: { type: GraphQLInt, },
    default_team: { type: GraphQLBoolean, },
    team: {
      type: TeamSlType,
      resolve: resolver(TeamSl)
    }
  })
});

export default UserTeamType;
