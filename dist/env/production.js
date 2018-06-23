'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {
  database: {
    name: process.env.GRAPHQL_DB_NAME,
    login: process.env.GRAPHQL_DB_LOGIN,
    password: process.env.GRAPHQL_DB_PASSWORD,
    host: process.env.GRAPHQL_DB_HOST,
    socketPath: process.env.GRAPHQL_DB_SOCKET_PATH,
    dialect: 'mysql'
  }
};
exports.config = config;