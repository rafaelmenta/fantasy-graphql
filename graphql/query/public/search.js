import PlayerType from '../../object-types/player';
import TeamSlType from '../../object-types/team-sl';
import { Player, TeamSl } from '../../../model/setup';

const graphql = require('graphql'),
  resolver = require('graphql-sequelize').resolver;

const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;


const SearchQuery = {
  search_players: {
    type: new GraphQLList(PlayerType),
    resolve: Player.PlayerSearch,
    args: {
      query: {
        type: new GraphQLNonNull(GraphQLString),
        name: 'query',
      },
    },
  },
  search_teams: {
    type: new GraphQLList(TeamSlType),
    resolve: TeamSl.TeamSearch,
    args: {
      query: {
        type: new GraphQLNonNull(GraphQLString),
        name: 'query',
      },
      id_league: {
        type: new GraphQLNonNull(GraphQLInt),
        name: 'id_league',
      },
    },
  },
};

export default SearchQuery;
