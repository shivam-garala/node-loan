const Sequelize = require("sequelize");
const sequelize = require("../config");

const User = sequelize.define("users", {
  id: { type: Sequelize.INTEGER(11).UNSIGNED, autoIncrement: true, allowNull: false, primaryKey: true, },
  name: { type: Sequelize.STRING(255), allowNull: true, defaultValue: null },
  mobile_number: { type: Sequelize.STRING(100), allowNull: true, defaultValue: null },
  password: { type: Sequelize.STRING(100), allowNull: false },
  auth_token: { type: Sequelize.STRING(10000), allowNull: this.truncate },
  deleted_at: { type: Sequelize.STRING, allowNull: true },
},
  {
    timestamps: false,
  }
);


module.exports = User;
