const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("./config")["development"
];
const ChatLog = require("./db/chatlog");
const Record = require('./db/record')


const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname).forEach((model) => {
  if (["index.js", "_migrations"].indexOf(model) !== -1) return;
  const modelFilePath = path.join(__dirname, model, "index.js");
  if (fs.existsSync(modelFilePath) && fs.lstatSync(modelFilePath).isFile()) {
    model = require(modelFilePath)(sequelize, DataTypes);
    db[model.name] = model;
  }
});

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.ChatLog = ChatLog;
db.Record = Record;

ChatLog.init(sequelize);
Record.init(sequelize)

module.exports = db;
