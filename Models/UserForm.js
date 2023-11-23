const Sequelize = require("sequelize");
const sequelize = require("../config");

const UserForm = sequelize.define("user_forms", {
  id: { type: Sequelize.INTEGER(11).UNSIGNED, autoIncrement: true, allowNull: false, primaryKey: true, },
  user_id: { type: Sequelize.INTEGER(11), allowNull: false },
  amount: { type: Sequelize.DECIMAL(8,2), allowNull: true },
  disbursal: { type: Sequelize.DECIMAL(8,2), allowNull: true },
  interest: { type: Sequelize.DECIMAL(8,2), allowNull: true },
  repayment: { type: Sequelize.DECIMAL(8,2), allowNull: true },
  service_charge: { type: Sequelize.DECIMAL(8,2), allowNull: true },
  received_amount: { type: Sequelize.DECIMAL(8,2), allowNull: true },
  gst: { type: Sequelize.DECIMAL(8,2), allowNull: true },
  deleted_at: { type: Sequelize.STRING, allowNull: true },
  month: {type: Sequelize.INTEGER, allowNull: true },
  aadhaar_number: {type: Sequelize.STRING(50), allowNull: true},
  pan_number: {type: Sequelize.STRING(50), allowNull: true},
  first_name: {type: Sequelize.STRING(255), allowNull: true},
  last_name: {type: Sequelize.STRING(255), allowNull: true},
  email: {type: Sequelize.STRING(255), allowNull: true},
  mobile_number: {type: Sequelize.STRING(50), allowNull: true},
  birth_date: {type: Sequelize.DATE, allowNull: true},
  gender: {type: Sequelize.STRING(255), allowNull: true},
  address: {type: Sequelize.TEXT, allowNull: true},
  city: {type: Sequelize.STRING(255), allowNull: true},
  state: {type: Sequelize.STRING(255), allowNull: true},
  country: {type: Sequelize.STRING(255), allowNull: true},
  pincode: {type: Sequelize.STRING(255), allowNull: true},
  monthly_income: {type: Sequelize.DECIMAL(11,2), allowNull: true},
  profession: {type: Sequelize.STRING(255), allowNull: true},
  bank_name: {type: Sequelize.STRING(255), allowNull: true},
  account_holder_name: {type: Sequelize.STRING(255), allowNull: true},
  account_number: {type: Sequelize.STRING(255), allowNull: true},
  ifsc_code: {type: Sequelize.STRING(255), allowNull: true},
},
  {
    timestamps: false,
  }
);


module.exports = UserForm;
