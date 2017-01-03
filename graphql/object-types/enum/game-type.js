
const graphql = require('graphql');

const {GraphQLEnumType} = graphql;

const GameType = new GraphQLEnumType({
  name : 'GameType',
  values : {
    LEAGUE : {
      value : 1
    },
    PLAYOFF : {
      value : 2
    },
    FRIENDLY : {
      value : 3
    },
  }
});

export default GameType;
