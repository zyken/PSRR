import express from "express";
import db from "../models/db";
import requestValidator from "../validations/requestValidator";
import authenticate from "../middleware/authenticate";

let router = express.Router();

router.post("/", authenticate, (req, res) => {

    const { heading, product, area, requestInfo, material } = req.body;

    const { errors, isValid } = requestValidator(req.body);

    const { id, username, email } = req.currentUser;

    if (isValid){
        db.requests.insert(
            { heading,
                product,
                area,
                requestInfo,
                material,
                id,
                username,
                email,
                created_at: new Date(),
                updated_at: new Date()
            }, (err, request) => {
            if(err){
                res.status(500).json({errors: err});
            } else{
                res.status(201).send({errors: {}, isValid});
            }
        });
    } else{
        res.status(400).json({errors: errors});
    }
});

router.get("/", (req, res) => {
    db.requests.find().sort({updated_at: -1 }, (err, users) => {
        if(err){
            res.status(500).json({errors: err});
        } else{
            if(users){
                res.json({errors: {}, users});
            }
        }
    });
});

router.get("/q?*", (req, res) => {
    const data = JSON.parse(req.query.data);

    const andQuery = {};
    //Todo - Add searchbox
    // We need to use regular expression of some kind
    if(data.product !== "0"){
        andQuery.product = data.product;
    }
    if(data.area !== "0"){
        andQuery.area = data.area;
    }
    if(data.material !== "0"){
        andQuery.material = data.material;
    }

    db.requests.find({$and: [andQuery]}).sort({updated_at: -1 }, (err, users) => {
        if(err){
            res.status(500).json({errors: err});
        } else{
            if(users){
                res.json({errors: {}, users});
            }
        }
    });

});

export default router;
