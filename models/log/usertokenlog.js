const Sequelize = require("sequelize");

module.exports = class UserTokenLog extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        mail: {
          // id 및 email
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: false,
        },
        authKinds: {
          // email=이메일 인증, pwChange=비밀번호 변경, pwFails=비밀번호 실패, dormant=휴먼계정, Withdrawal=회원탈퇴
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        remark: {
          // 비고
          type: Sequelize.STRING(15),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "UserTokenLog",
        tableName: "userTokenLog",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.UserTokenLog.belongsTo(db.User);
  }
};
