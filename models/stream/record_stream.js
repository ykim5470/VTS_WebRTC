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
        room_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        thumb_nail_origin: { type: Sequelize.STRING },
        thumb_nail_path: { type: Sequelize.STRING },
        record_file_name: { type: Sequelize.STRING },
        file_size: { type: Sequelize.INTEGER },
        broad_schedule: { type: Sequelize.STRING },
        title: { type: Sequelize.STRING },
        upload_status: { type: Sequelize.STRING },
        play_time: { type: Sequelize.STRING },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Record",
        tableName: "record",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Record.belongsTo(db.Stream);
  }
};
