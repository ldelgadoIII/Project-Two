require("dotenv").config();

const db = {
  development: {
    username: "root",
    password: process.env.DB_PASS,
    database: "TYL_DB",
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

// eslint-disable-next-line prettier/prettier
module.exports = db;
