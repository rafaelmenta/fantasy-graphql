
const graphql = require('graphql');

const {GraphQLEnumType} = graphql;

const DraftStatus = new GraphQLEnumType({
  name : 'DraftStatus',
  values : {
      STATUS_CLOSED : {
      value : 0,
    },
      STATUS_OPEN : {
      value : 1,
    },
      STATUS_FINISHED : {
      value : 2,
    },
  }
});

export default DraftStatus;
