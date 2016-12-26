import UserQuery from './user-query';
import TeamSlQuery from './team-sl-query';
import TeamNbaQuery from './team-nba';
import PlayerQuery from './player';
import DivisionQuery from './division';
import ConferenceQuery from './conference';
import LeagueQuery from './league';
import GameQuery from './game';
import RoundQuery from './round';

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
    RoundQuery
  ))
});

export default Query;