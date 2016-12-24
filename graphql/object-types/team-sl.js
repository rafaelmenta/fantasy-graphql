import UserType from './user';
import TeamSl from '../../model/team-sl';


const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} =  graphql;

const TeamSlType = new GraphQLObjectType({
  name: 'TeamSl',
  fields: () => ({
    id_sl: {
      type: GraphQLInt
    },
    city: {
      type: GraphQLString
    },
    nickname: {
      type: GraphQLString
    },
    slug: {
      type: GraphQLString
    },
    users: {
      type: new GraphQLList(UserType), 
      resolve: resolver(TeamSl.Users)
    }
  })
});

export default TeamSlType;