const User = require('./Models/User');
const sequelize = require('./config');
require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");
const UserForm = require('./Models/UserForm');


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
                const { mobile_number, password } = req.body;
                let user = await User.findOne({ where: { mobile_number } });
                if (!user) {
                  return res.status(400).json({
                    success: false,
                    message: "You have not registered with this mobile number. Please contact your administrator.",
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
                await User.update({ auth_token: authToken }, { where: { mobile_number } });
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
                mobile_number: req.body.mobile_number.trim(),
                password: securedPassword,
              };
              
              const mydata = await User.create(data);
             
      
              res
                .status(200)
                .json({
                  success: true,
                  message: "User created successfully",
                  data: { mobile_number: mydata.mobile_number },
                });
            } catch (error) {
              console.log(error);
              res.status(400).json({ message: "Bad request", success: false });
            }
        },
        createForm: async (req, res) => {
          try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              const error = errors.array().map((x) => {
                return { field: x.param, message: x.msg };
              });
              return res.status(409).json({ error, success: false });
            }
        
            const data = {
              user_id: req.body.user_id,
              amount: req.body.amount,
              disbursal: req.body.disbursal,
              interest: req.body.interest,
              repayment: req.body.repayment,
              service_charge: req.body.service_charge,
              received_amount: req.body.received_amount,
              gst: req.body.gst
            };
            
            const mydata = await UserForm.create(data);
           
    
            res
              .status(200)
              .json({
                success: true,
                message: "Form added successfully",
                mydata
              });
          } catch (error) {
            console.log(error);
            res.status(400).json({ message: "Bad request", success: false });
          }
      }
    };
  };
  module.exports = controller;
