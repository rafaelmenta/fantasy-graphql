import UserQuery from './user-query';
import TeamSlQuery from './team-sl';
import TeamNbaQuery from './team-nba';
import PlayerQuery from './player';
import DivisionQuery from './division';
import ConferenceQuery from './conference';
import LeagueQuery from './league';
import GameQuery from './game';
import RoundQuery from './round';
import SeasonQuery from './season';
import PlayerPerformanceQuery from './player-performance';
import TeamPerformanceQuery from './team-performance';
import PlayerTeamPerformanceQuery from './player-team-performance';
import PlayerStatsQuery from './player-stats';
import TeamStatsQuery from './team-stats';
import GameNbaQuery from './game-nba';
import DraftQuery from './draft';
import PickQuery from './pick';
import TradeQuery from './trade';
import FreeAgencyHistoryQuery from './free-agency-history'

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
    TeamPerformanceQuery,
    PlayerTeamPerformanceQuery,
    PlayerStatsQuery,
    TeamStatsQuery,
    GameNbaQuery,
    DraftQuery,
    PickQuery,
    TradeQuery,
    FreeAgencyHistoryQuery
  ))
});

export default Query;
