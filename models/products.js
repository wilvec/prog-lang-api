const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "products",
    {
      idproduct: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(245),
        allowNull: false,
        unique: "name_UNIQUE",
      },
      image: {
        type: DataTypes.STRING(145),
        allowNull: true,
      },
      unit_price: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(200),
        allowNull: false,
        default: "ND",
      },
    },
    {
      sequelize,
      tableName: "products",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "idproduct" }],
        },
        {
          name: "name_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [{ name: "name" }],
        },
      ],
    }
  );
};
