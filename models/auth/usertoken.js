const Sequelize = require("sequelize");

module.exports = class UserToken extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        mail: {
          // mail
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        authKinds: {
          // pwFails=비밀번호 실패, pwFinds=비밀번호 찾기, pwChange=비밀번호 변경, email=이메일 인증, dormant=휴먼계정, Withdrawal=회원탈퇴,
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        emailAuth: {
          // 300=이메일 미인증, 399=인증
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        emailToken: {
          // 랜덤 토큰
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        emailTime: {
          // 토큰을 보낸 시간
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "UserToken",
        tableName: "userToken",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.UserToken.belongsTo(db.User);
  }
};
