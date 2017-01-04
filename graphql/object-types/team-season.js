const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} =  graphql;

const TeamSeasonType = new GraphQLObjectType({
  name: 'TeamSeason',
  fields: () => ({
    ts_code: { type: GraphQLInt, },
    id_sl: { type: GraphQLInt, },
    id_season: { type: GraphQLInt, },
    win: { type : GraphQLInt },
    loss: { type : GraphQLInt },
  })
});

export default TeamSeasonType;
