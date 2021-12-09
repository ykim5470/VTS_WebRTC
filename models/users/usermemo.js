const Sequelize = require("sequelize");

module.exports = class UserMemo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
			    type: Sequelize.INTEGER,
		      autoIncrement: true,
			    primaryKey: true
		    },
        confirm: {
          // 10 : 승인 대기중, 44 = 반려, 54 = 승인취소, 99 = 승인
          type: Sequelize.INTEGER,
          allowNull: true,
        },        
        reason: {
          // 반려 사유
          type: Sequelize.STRING(400),
          allowNull: true,
        },
        memo: {
          // 반려 사유
          type: Sequelize.STRING(400),
          allowNull: true,
        },
        approvalid: {
          // 최종 승인자
          type: Sequelize.STRING(15),
          allowNull: true,
        }
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "UserMemo",
        tableName: "usermemo",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
