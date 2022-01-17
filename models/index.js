const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const moment = require("moment");
const User = require("./users/user");
const UserMy = require("./users/usermy");
const UserPw = require("./auth/userpw");
const UserPwCh = require("./auth/userpwch");
const UserPwLog = require("./log/userpwlog");
const UserToken = require("./auth/usertoken");
const UserTokenLog = require("./log/usertokenlog");
const ZLog = require("./log/zlog");
const UserMemo = require("./users/usermemo");

const ChatLog = require("./log/chatlog");
const Record = require("./stream/record_stream");
const Stream = require("./stream/stream");
const LiveStreamSetting = require("./stream/stream_setting");

//추가
const Products = require("./sotre/products");
const ProductsMemo = require("./sotre/productsmemo");
const UserActivityLog = require("./log/useractivitylog");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

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
db.ZLog = ZLog;
db.User = User;
db.UserMy = UserMy;
db.UserPw = UserPw;
db.UserPwCh = UserPwCh;
db.UserPwLog = UserPwLog;
db.UserToken = UserToken;
db.UserTokenLog = UserTokenLog;
//추가
db.UserMemo = UserMemo;
db.Products = Products;
db.ProductsMemo = ProductsMemo;

db.ChatLog = ChatLog;
db.Record = Record;
db.Stream = Stream;
db.UserActivityLog = UserActivityLog;
db.LiveStreamSetting = LiveStreamSetting;

ZLog.init(sequelize);
User.init(sequelize);
UserMy.init(sequelize);
UserPw.init(sequelize);
UserPwCh.init(sequelize);
UserPwLog.init(sequelize);
UserToken.init(sequelize);
UserTokenLog.init(sequelize);
//추가
UserMemo.init(sequelize);
Products.init(sequelize);
ProductsMemo.init(sequelize);

ChatLog.init(sequelize);
Record.init(sequelize);
Stream.init(sequelize);
UserActivityLog.init(sequelize);
LiveStreamSetting.init(sequelize);

// ZLog.associate(db);
// User.associate(db);
// UserMy.associate(db);
// UserPw.associate(db);
// UserPwCh.associate(db);
// UserPwLog.associate(db);
// UserToken.associate(db);
// UserTokenLog.associate(db);

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// 추가
Products.hasMany(ProductsMemo, {
  as: "Memo",
  foreignKey: "product_id",
  sourceKey: "id",
  onDelete: "CASCADE",
});

User.hasOne(UserMy, {
  as: "usermy",
  onDelete: "CASCADE",
});

User.hasMany(UserMemo, {
  as: "usermemo",
  foreignKey: "user_id",
  sourceKey: "id",
  onDelete: "CASCADE",
});

User.hasMany(UserPw);
User.hasMany(UserPwCh);
User.hasMany(UserPwLog);
User.hasMany(UserToken);
User.hasMany(UserTokenLog);

Stream.hasMany(LiveStreamSetting, {
  foreignKey: "room_id",
  sourceKey: 'room_id'
});
Stream.hasMany(Record,{
  foreignKey: "room_id",
  sourceKey: 'room_id'
});

Products.prototype.dateFormat = (date) => moment(date).format("YY/MM/DD HH:mm");

User.prototype.dateFormat = (date) => moment(date).format("YYYY-MM-DD");

UserMemo.prototype.dateFormat = (date) =>
  moment(date).format("YYYY.MM.DD HH:mm");

// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

module.exports = db;
