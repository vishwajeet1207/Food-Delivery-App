const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken")
const bcrypt=require('bcrypt')
const jwtsecret="Mynameisvishwajeet"
const user = require('../models/User');
const { default: mongoose } = require('mongoose');

router.post("/createuser",
    [
        body('email').isEmail(),
        body('password', "incorrect ").isLength({ min: 5 }),
        body('name').isLength({ min: 3 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt=await bcrypt.genSalt(10);
        let secpassword=await bcrypt.hash(req.body.password,salt)
        try {
            await user.create({
                name: req.body.name,
                // password: req.body.password,  first write this and then use bcryptjs
                password: secpassword,
                email: req.body.email,
                location: req.body.location

            })
            res.json({ success: true })
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    })


router.post("/loginuser",
    [
        body('email').isEmail(),
        body('password', "incorrect ").isLength({ min: 5 }),
        
    ]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;

        try {
            let userData = await user.findOne({email})
            if (!userData) {
                return res.status(400).json({ errors: "try wuth coreect" });
            }

            const pwdcompare=await bcrypt.compare(req.body.password,userData.password)
            if (!pwdcompare) {
                return res.status(400).json({ errors: "tyr wuth coreect" });

            }

            const data={
                user:{
                    id:userData.id
                }
            }

            const authtoken=jwt.sign(data,jwtsecret)
            return res.json({ success: true, authtoken:authtoken });

        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    })
module.exports = router; 