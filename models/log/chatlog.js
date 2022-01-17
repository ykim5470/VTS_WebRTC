const Sequelize = require("sequelize");

module.exports = class ChatLog extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
			    type: Sequelize.INTEGER,
		      autoIncrement: true,
			    primaryKey: true
        },
        userIp: {
          type: Sequelize.STRING(40),
          allowNull: true,

        },
        prefix: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        room: {
          type: Sequelize.STRING(10),
          defaultValue: "test",
        },
        name: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        content: {
          type: Sequelize.STRING(400),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "ChatLog",
        tableName: "chatLog",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
