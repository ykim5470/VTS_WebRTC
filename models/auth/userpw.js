const Sequelize = require("sequelize");

module.exports = class UserPw extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          // id 및 email
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        check: {
          // 비밀번호 실패시 +1
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        over: {
          // 비밀번호 실패 5회 이상시 +1
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        auth: {
          // 비밀번호 실패 5회 이상 (0=정상, 1=비정상)
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "UserPw",
        tableName: "userPw",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.UserPw.belongsTo(db.User);
  }
};
