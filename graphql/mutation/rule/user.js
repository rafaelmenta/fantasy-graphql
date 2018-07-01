import UserType from '../../object-types/private/user';
import UserInputType from '../../object-types/input/user';
import {User, UserTeam} from '../../../model/setup';
import Conn from '../../../database/connection';

const graphql = require('graphql');

const {
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull

} =  graphql;

const UserMutation = {
  addUser: {
    type: UserType,
    args: {
      user: { type: UserInputType },
    },
    resolve: (root, {user}) => User.create(user),
  },
  updateUser: {
    type: new GraphQLList(GraphQLInt),
    description: 'Returns [update_count]',
    args: {
      user: { type: UserInputType },
    },
    resolve: (root, {user}) => User.update(user, {
      where : {
        id_user: user.id_user
      }
    })
  },
  deleteUser: {
    type: GraphQLInt,
    description: 'Returns deleted items',
    args: {
      id_user: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: (root, user) => User.destroy({
      where : {
        id_user: user.id_user
      }
    }),
  },
  updateDefaultTeam: {
    type: new GraphQLList(GraphQLInt),
    description: 'Return [update_count]',
    args: {
      id_user: { type: new GraphQLNonNull(GraphQLInt) },
      id_sl: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: (root, args) => Conn.transaction(t =>
      UserTeam.update({ default_team: false }, { where: {id_user: args.id_user}, transaction: t })
        .then(() => UserTeam.update(
          { default_team: true },
          { where: {id_user: args.id_user, id_sl: args.id_sl}, transaction: t }
        )
      )
    ),
  }
};

export default UserMutation;
