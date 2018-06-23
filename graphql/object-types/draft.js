import PickType from './pick';
import SeasonType from './pick';
import LeagueType from './league';
import { Draft } from '../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} =  graphql;

const DraftType = new GraphQLObjectType({
  name: 'Draft',
  fields: () => ({
    id_draft: {
      type: GraphQLInt,
    },
    id_season: {
      type: GraphQLInt,
    },
    id_league: {
      type: GraphQLString,
    },
    year_draft: {
      type: GraphQLInt,
    },
    status_draft: {
      type: GraphQLInt,
    },
    picks: {
      type: new GraphQLList(PickType),
      resolve: resolver(Draft.Picks)
    },
    season: {
      type: SeasonType,
      resolve: resolver(Draft.Season)
    },
    league: {
      type: LeagueType,
      resolve: resolver(Draft.League)
    }
  })
});

export default DraftType;