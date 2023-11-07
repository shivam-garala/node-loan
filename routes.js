const express = require('express');
const Router = express.Router();

const controller = require('./controller');
const User = require('./Models/User');
const { body } = require("express-validator");


Router.post(
    "/login",
    [
      body("email", "Email can not be blank").exists(),
  
      body("password", "Password can not be blank").exists()
    ],
    controller().userLogin
  );

Router.post("/",  [
    body("email").custom((value) => {
      if (!value) {
        return Promise.reject("Enter email");
      }
      value = value.trim();
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject("This email is already in use");
        }
      });
    }),
  ], controller().createUser);


module.exports = Router;
