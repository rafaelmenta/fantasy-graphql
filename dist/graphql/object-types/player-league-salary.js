"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerLeagueSalaryType = void 0;

var _graphql = require("graphql");

var PlayerLeagueSalaryType = new _graphql.GraphQLObjectType({
  name: 'PlayerLeagueSalary',
  fields: function fields() {
    return {
      pls_code: {
        type: _graphql.GraphQLInt
      },
      id_league: {
        type: _graphql.GraphQLInt
      },
      id_player: {
        type: _graphql.GraphQLInt
      },
      contract_salary: {
        type: _graphql.GraphQLFloat
      },
      contract_years: {
        type: _graphql.GraphQLInt
      }
    };
  }
});
exports.PlayerLeagueSalaryType = PlayerLeagueSalaryType;