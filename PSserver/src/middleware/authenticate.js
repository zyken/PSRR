import jwt from "jsonwebtoken";
import config from "../config";
import mongojs from "mongojs";
import db from "../models/db";

export default (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    let token;

    if(authorizationHeader){
        token = authorizationHeader.split(" ")[1];
    }

    if(token){
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if(err){
                res.status(401).json({
                    error: "Failed to authenticate"
                });
            } else{
                db.users.findOne({_id: mongojs.ObjectId(decoded.id)}, (err, user) => {
                    if(err){
                        res.status(404).json({error: "No such user"});
                    } else{
                        if(user){
                            req.currentUser = {
                                id: user._id,
                                username: user.username,
                                email: user.email,
                            };
                            next();
                        } else{
                            res.status(404).json({error: "No such user"});
                        }
                    }
                });
            }
        });
    } else{
        res.status(403).json({
            error: "No token provided"
        });
    }
}
