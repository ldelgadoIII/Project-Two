const db = {
  development: {
    username: "root",
    password: process.env.JAWSDB_URL,
    database: "lz0c4oiomawnkck2",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "TYL_DB_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    // eslint-disable-next-line camelcase
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
};

module.exports = db;
