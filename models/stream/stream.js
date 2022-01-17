const Sequelize = require("sequelize");

module.exports = class Stream extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        room_id: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false
        },
        host_name: {
          type: Sequelize.STRING,
          allowNull: false
        }
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
