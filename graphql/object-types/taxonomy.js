
import { GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

export const TaxonomyType = new GraphQLObjectType({
  name: 'Taxonomy',
  fields: () => ({
    tax_id: { type: GraphQLInt },
    id: { type: GraphQLInt },
    slug: { type: GraphQLString },
  }),
});
