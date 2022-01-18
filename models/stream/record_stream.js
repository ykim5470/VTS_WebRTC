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
        thumb_nail_origin: { type: Sequelize.STRING,
        allowNull: true },
        thumb_nail_path: { type: Sequelize.STRING,
        allowNull : true },
        record_file_name: { type: Sequelize.STRING,
        allowNull: false },
        file_size: { type: Sequelize.INTEGER,
        allowNull: true },
        broad_schedule: { type: Sequelize.STRING,
        allowNull: true },
        title: { type: Sequelize.STRING,
        allowNull: true },
        upload_status: { type: Sequelize.STRING,
        allowNull: false,
       },
        play_time: { type: Sequelize.STRING,
        allowNull: true },
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
