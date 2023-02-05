const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');  
const User = require('../model/user.model'); 


const verifyToken = (req, res, next) => {
     if (!req.headers.authorization) {
        return res.status(401).send({
            data: [],
            success: false,
            message: "Unauthorized request",
        });
     }

     let token = req.headers.authorization.split(" ")[1];
     if (token === "null") {
        return res.status(401).send({
            data: [],
            success: false,
            message: "Unauthorized request",
        });
     }

     let payload = jwt.verify(token, "secretkey");
     if (!payload) {
        return res.status(401).send({
            data: [],
            success: false,
            message: "Unauthorized request",
        });
     }

     req.userId = payload.subject;

     next();
}

const registerUser = async (req, res) => {
    try{
        let userData = req.body; 
        User.findOne({email: userData.email}, async (error, user) => {
            if(error) throw error;  
            if(user) {
                return res.status(200).send({
                    data: [], 
                    success: false, 
                    message: 'User with same email already registered'
                })
            }
            bcrypt.hash(userData.password, 10).then( async (hashedPassword) => {
                let newUser = new User({
                    email: userData.email, 
                    password: hashedPassword,
                })
                await newUser.save(); 
            })

            let payload = { subject: registerUser._id }; 
            let token = jwt.sign(payload, "secretkey"); 
            return res.status(200).send({
            data: token, 
            success: true, 
            message: 'Successfully Registered',
            })
               
        })

    } catch(err) {
        return res.status(404).send({
            data: [], 
            success: false, 
            message: err,
        })
    }
}

const loginUser = (req, res) => {
    try{
        let userData = req.body;
        User.findOne({ email: userData.email}, (error, user) => {
            if(error) throw error; 
            else {
                if(!user) {
                    return res.status(401).send({
                        data: [], 
                        success: false, 
                        message: 'User Not Found'
                    })
                }
                bcrypt.compare(userData.password, user.password).then((passwordCheck) => {
                    if(!passwordCheck) {
                        return res.status(400).send({
                            data: [], 
                            success: false, 
                            message: "Password does not match"
                        })
                    }
                    let payload = {subject : user._id}; 
                    let token = jwt.sign(payload, "secretkey");
                    return res.status(200).send({
                        data: {token, user}, 
                        success: true, 
                        message: 'login successful'
                    })
                })
            }
        })
    } catch(err) {
        return res.status(404).send({
          data: [],
          success: false,
          message: err,
        });
    }
}

module.exports = {
    verifyToken,
    registerUser, 
    loginUser
}