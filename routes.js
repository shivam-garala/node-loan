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

Router.post("/addForm",  controller().createForm);

module.exports = Router;
