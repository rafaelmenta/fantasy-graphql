import UserTeamType from '../user-team';
import PermissionType from '../enum/permission';
import {User} from '../../../model/setup';
import League from '../../../model/league';

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
    id_permission: { type: GraphQLInt, },
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
    },
    leagues_owned: {
      type: new GraphQLList(GraphQLInt),
      resolve: user =>
        League.findAll({attributes: ['id_league'], where: {id_owner: user.id_user}})
          .then(leagues => leagues.map(league => league.id_league)),
    },
  })
});

export default UserType;
