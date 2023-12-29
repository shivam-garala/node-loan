const Sequelize = require("sequelize");
const sequelize = require("../config");

const PaymentCredentials = sequelize.define("payment_credentials", {
  id: { type: Sequelize.INTEGER(11).UNSIGNED, autoIncrement: true, allowNull: false, primaryKey: true, },
  upi_id: { type: Sequelize.STRING(255), allowNull: true },
  merchant_name: { type: Sequelize.STRING(255), allowNull: true },
  deleted_at: { type: Sequelize.STRING, allowNull: true },
},
  {
    timestamps: false,
  }
);


module.exports = PaymentCredentials;
