import UserType from '../object-types/user';
import {User} from '../../model/setup';

const graphql = require('graphql'),
      resolver = require('graphql-sequelize').resolver;

const {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} =  graphql;


const UserQuery = {
  user: {
    type: UserType,
    resolve: resolver(User),
    args: {
      id_user: {
        name : 'id_user',
        type : new GraphQLNonNull(GraphQLInt)
      }
    }
  },
  users: {
      type: new GraphQLList(UserType),
      resolve: resolver(User)
  }
}

export default UserQuery;