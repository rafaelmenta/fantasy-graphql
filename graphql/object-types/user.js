import TeamSlType from './team-sl';
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
    }
    ,
    teams: {
      type: new GraphQLList(TeamSlType),
      resolve: resolver(User.Teams)
    }
  })
});

export default UserType;