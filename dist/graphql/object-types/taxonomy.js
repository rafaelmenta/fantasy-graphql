'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaxonomyType = undefined;

var _graphql = require('graphql');

var TaxonomyType = exports.TaxonomyType = new _graphql.GraphQLObjectType({
  name: 'Taxonomy',
  fields: function fields() {
    return {
      tax_id: { type: _graphql.GraphQLInt },
      id: { type: _graphql.GraphQLInt },
      slug: { type: _graphql.GraphQLString }
    };
  }
});