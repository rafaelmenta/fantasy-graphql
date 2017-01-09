
const graphql = require('graphql');

const {GraphQLEnumType} = graphql;

const PermissionType = new GraphQLEnumType({
  name : 'Permission',
  values : {
    ADMIN : {
      value : 1
    },
    COMMISSIONER : {
      value : 2
    },
    UPDATER : {
      value : 3
    },
    USER : {
      value : 4
    },
    VISITOR : {
      value : 5
    }
  }
});

export default PermissionType;
