const User = require('./Models/User');
const sequelize = require('./config');
require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");


const controller = () => {
    return {
        userLogin: async (req, res) => {
            try {
        
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                  const error = errors.array().map((x) => {
                    return {
                      field: x.param,
                      message: x.msg,
                    };
                  });
                  return res.status(400).json({
                    error,
                    success: false
                  });
                }
                const { email, password } = req.body;
                let user = await User.findOne({ where: { email } });
                if (!user) {
                  return res.status(400).json({
                    success: false,
                    message: "You have not registered with this email. Please contact your administrator.",
                  });
                }
                const comparePassword = await bcrypt.compare(password, user.dataValues.password);
                if (!comparePassword) {
                  return res.status(400).json({
                    success: false,
                    message: "Please enter valid password",
                  });
                }
                const data = {
                  user: {
                    id: user.id,
                  },
                };
               
                const authToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });

                // add user token
                await User.update({ auth_token: authToken }, { where: { email } });
                res.cookie("authorization", `Bearer ${authToken}`).status(200).json({
                  success: true,
                  authToken,
                  id: user.id,
                });
            } catch (error) {
              res
                .status(500)
                .json({
                  message: "Internal Server error",
                  success: false
                });
            }
        },
        createUser: async (req, res) => {
            try {
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                const error = errors.array().map((x) => {
                  return { field: x.param, message: x.msg };
                });
                return res.status(409).json({ error, success: false });
              }
              const salt = await bcrypt.genSalt(10);
              const securedPassword = await bcrypt.hash(req.body.password, salt);
              const data = {
                email: req.body.email.trim(),
                password: securedPassword,
              };
              
              const mydata = await User.create(data);
             
      
              res
                .status(200)
                .json({
                  success: true,
                  message: "User created successfully",
                  data: { email: mydata.email },
                });
            } catch (error) {
              console.log(error);
              res.status(400).json({ message: "Bad request", success: false });
            }
          }
    };
  };
  module.exports = controller;
