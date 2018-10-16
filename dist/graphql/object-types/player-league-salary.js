'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerLeagueSalaryType = undefined;

var _graphql = require('graphql');

var PlayerLeagueSalaryType = exports.PlayerLeagueSalaryType = new _graphql.GraphQLObjectType({
  name: 'PlayerLeagueSalary',
  fields: function fields() {
    return {
      pls_code: { type: _graphql.GraphQLInt },
      id_league: { type: _graphql.GraphQLInt },
      id_player: { type: _graphql.GraphQLInt },
      contract_salary: { type: _graphql.GraphQLFloat },
      contract_years: { type: _graphql.GraphQLInt }
    };
  }
});