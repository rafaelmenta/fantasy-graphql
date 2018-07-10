import {Taxonomy} from '../../../model/setup';
import { GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';

export const SystemQuery = {
  slug_count: {
    type: GraphQLInt,
    args: {
      slug: { type : new GraphQLNonNull(GraphQLString) },
    },
    resolve: (root, {slug}) => Taxonomy.count({where: {slug}}),
  },
};