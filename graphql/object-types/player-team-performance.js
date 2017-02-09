import {PlayerTeamPerformance} from '../../model/setup';
import PlayerType from './player';
import TeamSlType from './team-sl';
import RoundType from './round';
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

const PlayerTeamPerformanceType = new GraphQLObjectType({
  name: 'PlayerTeamPerformance',
  fields: () => ({
    ptp_code : { type: GraphQLInt },
    id_sl : { type: GraphQLInt },
    id_round : { type: GraphQLInt },
    id_player : { type: GraphQLInt },
    fantasy_points : { type : GraphQLFloat },
    order : { type : GraphQLInt },
    primary_position : { type : GraphQLString },
    secondary_position : { type : GraphQLString },
    minutes_primary : { type : GraphQLInt },
    minutes_secondary : { type : GraphQLInt },
    player : {
      type : PlayerType,
      resolve : resolver(PlayerTeamPerformance.Player)
    },
    round : {
      type : RoundType,
      resolve : resolver(PlayerTeamPerformance.Round)
    },
    team_sl : {
      type : TeamSlType,
      resolve: resolver(PlayerTeamPerformance.TeamSl)
    },
    performance: {
      type: PlayerPerformanceType,
      resolve: PlayerTeamPerformance.PlayerPerformance
    }
  })
});

export default PlayerTeamPerformanceType;
