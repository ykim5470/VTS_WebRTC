const Sequelize = require("sequelize");

module.exports = class Products extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
			    type: Sequelize.INTEGER,
		      autoIncrement: true,
			    primaryKey: true
		    },
        name: { 
            type: Sequelize.STRING(40),
            allowNull: false
        },
        price: { 
            type: Sequelize.INTEGER,
            allowNull: false
        },
        description: { 
            type: Sequelize.STRING(200),
        },
        status: { 
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Product",
        tableName: "product",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
};