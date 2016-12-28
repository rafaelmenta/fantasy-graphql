import Player from '../../model/player';
import TeamNbaType from './team-nba';
import PlayerPerformanceType from './player-performance';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList
} =  graphql;

const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    id_player: {
      type: GraphQLInt,
    },
    login: {
      type: GraphQLString,
    },
    nickname: {
      type: GraphQLString,
    },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    id_nba: { type: GraphQLInt },
    default_primary: { type: GraphQLString },
    default_secondary: { type: GraphQLString },
    primary_position: { type: GraphQLString },
    secondary_position: { type: GraphQLString },
    player_slug: { type: GraphQLString },
    retired: { type: GraphQLBoolean },
    rookie: { type: GraphQLBoolean },
    birthdate: { type: GraphQLString },
    contract_salary: { type: GraphQLFloat },
    contract_years: { type: GraphQLInt },
    team_nba : {
      type : TeamNbaType,
      resolve : resolver(Player.TeamNba)
    },
    performances : {
      type : new GraphQLList(PlayerPerformanceType),
      resolve : resolver(Player.Performances),
      args : {
        id_round : {
          name : 'id_round',
          type : new GraphQLList(GraphQLInt)
        }
      }
    }
  })
});

export default PlayerType;