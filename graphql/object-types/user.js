import UserTeamType from './user-team';
import User from '../../model/user';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} =  graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A User',
  fields: () => ({
    id_user: {
      type: GraphQLInt,
    },
    login: {
      type: GraphQLString,
    },
    nickname: {
      type: GraphQLString,
    },
    teams: {
      type: new GraphQLList(UserTeamType),
      resolve: resolver(User.UserTeams)
    }
  })
});

export default UserType;
