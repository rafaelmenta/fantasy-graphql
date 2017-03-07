import UserTeamType from '../user-team';
import PermissionType from '../enum/permission';
import {User} from '../../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} =  graphql;

const UserType = new GraphQLObjectType({
  name: 'PrivateUser',
  description: 'A User',
  fields: () => ({
    id_user: { type: GraphQLInt, },
    login: { type: GraphQLString, },
    first_name: { type: GraphQLString, },
    last_name: { type: GraphQLString, },
    email: { type: GraphQLString, },
    password: { type: GraphQLString, },
    nickname: { type: GraphQLString, },
    id_permission: { type: GraphQLInt },
    teams: {
      type: new GraphQLList(UserTeamType),
      resolve: resolver(User.UserTeams)
    }
  })
});

export default UserType;
