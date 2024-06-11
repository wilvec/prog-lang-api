const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    idorder: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('NEW','IN PROGRESS','COMPLETED','CANCELED'),
      allowNull: false
    },
    delivery_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    users_iduser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'iduser'
      }
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idorder" },
        ]
      },
      {
        name: "fk_orders_users_idx",
        using: "BTREE",
        fields: [
          { name: "users_iduser" },
        ]
      },
    ]
  });
};
