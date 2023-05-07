const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');//use body if validation apply on request body other wise use query for query validation
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const getUser = require('../middleware/fetchuser');


//route1
router.post('/createuser',
    [// sending validation in array to apply on request body
        body("password").isLength({ min: 5 }),
        body("name").isLength({ min: 3 }),
        body("email", "Enter a Valid Email").isEmail(),
    ]
    , async (req, res) => {  // req =request, res= response
        const result = validationResult(req);//auto perform validation and get result in assign varaiable
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "sory this email already exist" });
            }
            var salt = await bcrypt.genSaltSync(10);
            var hash = await bcrypt.hashSync(req.body.password, salt);

            user = await User.create({ // one way of creating user
                name: req.body.name,
                password: hash,
                email: req.body.email
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            //then and catch can be use if this is not synchronized
            // .then(user=>res.json(user)).catch(err=>{ console.log(err);
            //     res.json({ error: "Please Enter Unique Email", message:err.message }) 
            // });
            // const user=User(req.body);
            // user.save();//other way of creating user

            var token = jwt.sign(data, 'saimsignature');
            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(400).send("Internal Server Error");
        }

    });



//route 2 login
router.post('/login',
    [// sending validation in array to apply on request body
        body("password").exists(),
        body("email", "Enter a Valid Email").isEmail(),
    ]
    , async (req, res) => {  // req =request, res= response
        const result = validationResult(req);//auto perform validation and get result in assign varaiable
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }
        const {email, password}= req.body;// here we use destructuring method of javascript ev6 to auto get matching property
        try {
            let user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ error: "PLEASE try to login with correct cred" });
            }
            var passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "PLEASE try to login with correct cred" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }

            var token = jwt.sign(data, 'saimsignature');
            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(400).send("Internal Server Error");
        }

    });

//route 3
router.post('/getuser', getUser , async (req, res) => {  
      
        try {
            let userid = req.user.id;
            const user = await User.findById(userid).select("-password");
            
            res.send(user);
        } catch (error) {
            console.error(error);
            res.status(400).send("Internal Server Error");
        }

    });
module.exports = router;