import express from "express";
import bcrypt from "bcrypt";
import mongojs from "mongojs";
import db from "../models/db";
import jwt from "jsonwebtoken";
import config from "../config";


let router = express.Router();

router.post("/", (req, res) => {
    const { identifier, password } = req.body;

    db.users.findOne({$or : [{username: identifier}, {email: identifier}]}, (err, user) => {
        if(user){
            if (bcrypt.compareSync(password, user.password)){
                const token = jwt.sign({
                    id: mongojs.ObjectId(user._id),
                    username: user.username
                }, config.jwtSecret);
                res.json({token});
            } else{
                res.status(401).json({ errors: { form: "Invalid Credentials" }});
            }
        } else{
            res.status(401).json({ errors: { form: "Invalid Credentials" }});
        }
    });
});

export default router;
