import PlayerType from './player';
import TeamNba from '../../model/team-nba';


const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} =  graphql;

const TeamNbaType = new GraphQLObjectType({
  name: 'TeamNba',
  fields: () => ({
    id_nba: {
      type: GraphQLInt
    },
    city: {
      type: GraphQLString
    },
    nickname: {
      type: GraphQLString
    },
    symbol: {
      type: GraphQLString
    },
    slug: {
      type: GraphQLString
    },
    primary_color: { type: GraphQLString },
    secondary_color: { type: GraphQLString },
    players: {
      type: new GraphQLList(PlayerType),
      resolve: resolver(TeamNba.Players)
    }
  })
});

export default TeamNbaType;
