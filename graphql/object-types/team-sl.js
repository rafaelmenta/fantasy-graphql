import UserType from './user';
import PlayerType from './player';
import DivisionType from './division';
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
    },
    players: {
      type: new GraphQLList(PlayerType),
      resolve: resolver(TeamSl.Players)
    },
    division: {
      type: DivisionType,
      resolve: resolver(TeamSl.Division)
    }
  })
});

export default TeamSlType;