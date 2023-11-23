const express = require('express');
const Router = express.Router();

const controller = require('./controller');
const User = require('./Models/User');
const { body } = require("express-validator");


Router.post(
    "/login",
    [
      body("mobile_number", "Mobile number can not be blank").exists(),
  
      body("password", "Password can not be blank").exists()
    ],
    controller().userLogin
  );

Router.post("/createUser",  [
    /* body("name").custom((value) => {
      if (!value) {
        return Promise.reject("Enter name");
      }  
    }), */
    body("mobile_number").custom((value) => {
      if (!value) {
        return Promise.reject("Enter mobile number");
      }
      value = value.trim();
      return User.findOne({ where: { mobile_number: value } }).then((user) => {
        if (user) {
          return Promise.reject("This mobile number is already in use");
        }
      });
    }),
  ], controller().createUser);

Router.post("/addForm", [

  body("amount").not().isEmpty().withMessage("Enter amount"),
  body("disbursal").not().isEmpty().withMessage("Enter disbursal"),
  body("interest").not().isEmpty().withMessage("Enter interest"),
  body("repayment").not().isEmpty().withMessage("Enter repayment"),
  body("service_charge").not().isEmpty().withMessage("Enter service charge"),
  body("received_amount").not().isEmpty().withMessage("Enter recieved amount"),
  body("gst").not().isEmpty().withMessage("Enter gst"),
  body("month").not().isEmpty().withMessage("Enter month"),
  body("aadhaar_number").not().isEmpty().withMessage("Enter your aadhaar number"),
  body("pan_number").not().isEmpty().withMessage("Enter your pan number"),
  body("first_name").not().isEmpty().withMessage("Enter your first name"),
  body("last_name").not().isEmpty().withMessage("Enter your last name"),
  body("email").not().isEmpty().withMessage("Enter your email"),
  body("mobile_number").not().isEmpty().withMessage("Enter your mobile number"),
  body("birth_date").not().isEmpty().withMessage("Enter your birth date"),
  body("gender").not().isEmpty().withMessage("Enter your gender"),
  body("address").not().isEmpty().withMessage("Enter your address"),
  body("city").not().isEmpty().withMessage("Enter city"),
  body("state").not().isEmpty().withMessage("Enter state"),
  body("country").not().isEmpty().withMessage("Enter country"),
  body("pincode").not().isEmpty().withMessage("Enter pincode"),
  body("monthly_income").not().isEmpty().withMessage("Enter your monthly income"),
  body("profession").not().isEmpty().withMessage("Enter your profession"),
  body("bank_name").not().isEmpty().withMessage("Enter bank name"),
  body("account_holder_name").not().isEmpty().withMessage("Enter account holder name"),
  body("account_number").not().isEmpty().withMessage("Enter account number"),
  body("ifsc_code").not().isEmpty().withMessage("Enter ifsc code"),

],  controller().createForm);

Router.get("/loanAmount/:user_id",  controller().getLoanAmount);

module.exports = Router;
