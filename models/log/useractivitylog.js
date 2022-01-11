const Sequelize = require("sequelize");

module.exports = class userActivityLog extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        nick: {
            // 회원, 비회원; 비회원일 경우 Null
            type: Sequelize.STRING(40),
            allowNull: true
        },
        roomId: {
          // 좋아요 클릭한 스트림 방 ID
          type: Sequelize.STRING(40),
          allowNull : true // 향후 방 생성이 자동화 될 경우 allowNull False로 수정할 것
        },

        likeAction: {
          // 좋아요 클릭 횟수
          type: Sequelize.INTEGER,
          allowNull: false,
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
        modelName: "userActivityLog",
        tableName: "userActivityLog",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
