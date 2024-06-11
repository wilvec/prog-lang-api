const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_details', {
    orders_idorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'orders',
        key: 'idorder'
      }
    },
    products_idproduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'idproduct'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'order_details',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orders_idorder" },
          { name: "products_idproduct" },
        ]
      },
      {
        name: "fk_orders_has_products_products1_idx",
        using: "BTREE",
        fields: [
          { name: "products_idproduct" },
        ]
      },
      {
        name: "fk_orders_has_products_orders1_idx",
        using: "BTREE",
        fields: [
          { name: "orders_idorder" },
        ]
      },
    ]
  });
};
