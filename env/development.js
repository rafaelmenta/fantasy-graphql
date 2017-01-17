const config = {
  database : {
    name : process.env.GRAPHQL_DB_NAME,
    login : process.env.GRAPHQL_DB_LOGIN,
    password : process.env.GRAPHQL_DB_PASSWORD,
    host: process.env.GRAPHQL_DB_HOST,
    dialect: 'mysql'
  }
};

export { config };





