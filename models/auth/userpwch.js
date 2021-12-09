const Sequelize = require("sequelize");

module.exports = class UserPwCh extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          // Local email
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: false,
        },
        mail: {
          // 인증받은 mail
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        password: {
          // 변경 비밀번호
          type: Sequelize.STRING(100),
          allowNull: true,
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
        modelName: "UserPwCh",
        tableName: "userPwCh",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.UserPwCh.belongsTo(db.User);
  }
};
