const Sequelize = require("sequelize");

module.exports = class UserPwLog extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          // id 및 email
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: false,
        },
        connectIp: {
          // 사용자 접속 ip
          type: Sequelize.STRING(40),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "UserPwLog",
        tableName: "userPwLog",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.UserPwLog.belongsTo(db.User);
  }
};
