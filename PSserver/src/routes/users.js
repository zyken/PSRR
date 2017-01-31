import express from "express";
import validateSignupInput from "../shared/validations/signup";

import bcrypt from "bcrypt";

import db from "../models/db";

let router = express.Router();

router.get("/:identifier", (req, res) => {
    db.users.findOne({$or: [{username: req.params.identifier}, {email: req.params.identifier}]}, (err, user) =>{
        if(err) {
            res.status(500).json({error: "No such user"});
        } else{
            if(user){
                res.json({user: {username: user.username, email: user.email}});
            } else{
                res.json({user: null});
            }
        }
    });
});

router.post("/", (req, res) => {
    const {errors, isValid} = validateSignupInput(req.body);
    if(isValid) {
        const { username, email, password } = req.body;
        const password_digest = bcrypt.hashSync(password, 10);
        const user =
        {
            username,
            email,
            password: password_digest,
            created_at: new Date(),
            updated_at: new Date(),
        }

        insertUser(db.users, user, function(err, data){
            if(err){
                res.status(500).json(err);
            }else{
                res.json(data);
            }
        });
    }
    else {
        res.status(400).json(errors);
    }

});


function insertUser(collection, user, callback){
    collection.findOne({$or: [{username: user.username}, {email: user.email}]}, function(err, data){
        if(err){
            callback({error: err}, null);
        } else{
            if(data){
                const errors = {};

                if(data.username === user.username){
                    errors.username = "Username does already exists";
                }
                if(data.email === user.email){
                    errors.email = "Email does already exists";
                }
                callback({errors}, null);
            } else{
                collection.insert(user, function(err, data){
                    if(err){
                        callback({errors: err}, null);
                    } else{
                        callback(null, user);
                    }
                });
            }
        }
    });
}

export default router;
