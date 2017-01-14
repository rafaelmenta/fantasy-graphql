import {Player} from '../../model/setup';
import TeamNbaType from './team-nba';
import TeamPlayerType from './team-player';
import PlayerPerformanceType from './player-performance';
import PlayerStatsType from './player-stats';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

import TradeStatus from './enum/trade-status';

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList
} =  graphql;

const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: () => ({
    id_player: {
      type: GraphQLInt,
    },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    id_nba: { type: GraphQLInt },
    default_primary: { type: GraphQLString },
    default_secondary: { type: GraphQLString },
    player_slug: { type: GraphQLString },
    retired: { type: GraphQLBoolean },
    rookie: { type: GraphQLBoolean },
    birthdate: { type: GraphQLString },
    contract_salary: { type: GraphQLFloat },
    contract_years: { type: GraphQLInt },

    team_info : {
      type: TeamPlayerType,
      resolve: Player.Team,
    },

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
    },

    stats : {
      type : new GraphQLList(PlayerStatsType),
      resolve : resolver(Player.Stats),
      args : {
        id_season : {
          name :'id_season',
          type : new GraphQLList(GraphQLInt)
        }
      }
    }
  })
});

export default PlayerType;
