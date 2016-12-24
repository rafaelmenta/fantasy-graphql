import UserType from '../object-types/user';
import TeamSlType from '../object-types/team-sl';

// import { TeamSl, User } from '../../model/setup';
import Setup from '../../model/setup';
const User = Setup.User,
      TeamSl = Setup.TeamSl;

const graphql = require('graphql'),
      // { User, TeamSl } = require('../../model/setup'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;


const Query = new GraphQLObjectType({
  name: 'Query'
  ,
  fields: () => ({
    user: {
      type: UserType,
      resolve: resolver(User),
      args: {
        id_user: {
          name : 'id_user',
          type : new GraphQLNonNull(GraphQLInt)
        }
      }
    }
    ,
    users: {
      type: new GraphQLList(UserType),
      resolve: resolver(User)
    },
    teams: {
      type: new GraphQLList(TeamSlType),
      resolve: resolver(TeamSl)
    }
  })
});

export default Query;