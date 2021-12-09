const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    operatorsAliases: process.env.DB_OPERATORS_ALIASES,
  },
  developmentEmail: {
    MAIL_SERVICE: process.env.MAIL_SERVICE,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_FROM: process.env.MAIL_FROM,
  },
};
