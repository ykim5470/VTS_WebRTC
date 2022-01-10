const Sequelize = require("sequelize");

module.exports = class Record extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        streamer: {
          // 스트리머
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        thumbnailOrigin: {
          // 프로필 이미지 원몬파일명
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        thumbnailHash: {
          // 프로필 이미지 해시명
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        thumbnailPath: {
          // 프로필 이미지 경로
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        broadcaster: {
          // 방송 진행자
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        schedule: {
          // 스케줄
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Stream",
        tableName: "stream",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
