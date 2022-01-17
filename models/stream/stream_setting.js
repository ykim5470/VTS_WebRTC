const Sequelize = require("sequelize");

module.exports = class LiveStreamSetting extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        room_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        thumb_nail_origin: { type: Sequelize.STRING },
        thumb_nail_path: { type: Sequelize.STRING },
        host_nickname: { type: Sequelize.STRING },
        broad_schedule: { type: Sequelize.STRING },
        category: { type: Sequelize.STRING },
        title: { type: Sequelize.STRING },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "LiveStreamSetting",
        tableName: "liveStreamSetting",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  
  static associate(db) {
    db.LiveStreamSetting.belongsTo(db.Stream);
  }
};
