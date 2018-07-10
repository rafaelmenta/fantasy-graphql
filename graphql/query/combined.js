import UserQuery from './private/user';
import PrivateUserQuery from './public/user';
import TeamSlQuery from './public/team-sl';
import TeamNbaQuery from './public/team-nba';
import PlayerQuery from './public/player';
import DivisionQuery from './public/division';
import ConferenceQuery from './public/conference';
import LeagueQuery from './public/league';
import GameQuery from './public/game';
import RoundQuery from './public/round';
import SeasonQuery from './public/season';
import PlayerPerformanceQuery from './public/player-performance';
import TeamPerformanceQuery from './public/team-performance';
import PlayerTeamPerformanceQuery from './public/player-team-performance';
import PlayerStatsQuery from './public/player-stats';
import TeamStatsQuery from './public/team-stats';
import GameNbaQuery from './public/game-nba';
import DraftQuery from './public/draft';
import PickQuery from './public/pick';
import TradeQuery from './public/trade';
import FreeAgencyHistoryQuery from './public/free-agency-history'
import SearchQuery from './public/search';
import { ArchiveQuery } from './public/archive';
import { SystemQuery } from './public/system';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
} = graphql;

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => (Object.assign({},
    UserQuery,
    PrivateUserQuery,
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
    FreeAgencyHistoryQuery,
    SearchQuery,
    ArchiveQuery,
    SystemQuery,
  ))
});

export default Query;
