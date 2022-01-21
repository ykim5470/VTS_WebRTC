const { UUIDV4 } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = class Stream extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: UUIDV4
        },
        room_id: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false
        },
        host_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        active_status: {
          type: Sequelize.ENUM('0','1'),
          allowNull: false,
          defaultValue: 1
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
