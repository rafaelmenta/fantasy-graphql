import { GraphQLObjectType, GraphQLInt, GraphQLFloat } from 'graphql';

export const PlayerLeagueSalaryType = new GraphQLObjectType({
  name: 'PlayerLeagueSalary',
  fields: () => ({
    pls_code: { type: GraphQLInt },
    id_league: { type: GraphQLInt },
    id_player: { type: GraphQLInt },
    contract_salary: { type: GraphQLFloat },
    contract_years: { type: GraphQLInt },
  }),
});
