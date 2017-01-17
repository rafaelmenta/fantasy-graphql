const config = {
  database : {
    name : process.env.GRAPHQL_DB_NAME || 'api',
    login : process.env.GRAPHQL_DB_LOGIN || 'root',
    password : process.env.GRAPHQL_DB_PASSWORD || '',
    host: process.env.GRAPHQL_DB_HOST || 'localhost',
    dialect: 'mysql'
  }
};

export { config };
