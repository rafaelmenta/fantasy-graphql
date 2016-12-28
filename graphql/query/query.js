import UserQuery from './user-query';
import TeamSlQuery from './team-sl-query';
import TeamNbaQuery from './team-nba';
import PlayerQuery from './player';
import DivisionQuery from './division';
import ConferenceQuery from './conference';
import LeagueQuery from './league';
import GameQuery from './game';
import RoundQuery from './round';
import SeasonQuery from './season';
import PlayerPerformanceQuery from './player-performance';
import PlayerStatsQuery from './player-stats';
import GameNbaQuery from './game-nba';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
} = graphql;

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => (Object.assign({},
    UserQuery,
    TeamSlQuery,
    TeamNbaQuery,
    PlayerQuery,
    DivisionQuery,
    ConferenceQuery,
    LeagueQuery,
    GameQuery,
    RoundQuery,
    SeasonQuery,
    PlayerPerformanceQuery,
    PlayerStatsQuery,
    GameNbaQuery
  ))
});

export default Query;