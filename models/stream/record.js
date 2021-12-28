const Sequelize = require("sequelize");

module.exports = class Record extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
			    type: Sequelize.INTEGER,
		        autoIncrement: true,
			    primaryKey: true
        },
        filename: {
          type: Sequelize.STRING,
          allowNull: false
        },
        streamer: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        fileSize: {
        // 2 GB
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        uploaded: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },
        title: {
          type: Sequelize.STRING,
          allowNull: true
        },
        schedule: {
          type: Sequelize.STRING,
          allowNull: true
        },
        status: {
          type: Sequelize.BOOLEAN, 
          defaultValue: false,
          allowNull: false
        }
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
};
