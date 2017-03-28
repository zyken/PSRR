import express from "express";
import db from "../models/db";
import requestValidator from "../validations/requestValidator";
import authenticate from "../middleware/authenticate";
import formidable from "formidable";
import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: "dlmjfhwul",
    api_key: "367172858755665",
    api_secret: "rsPMV7qoLU5qZBQc-28m0zFBat4"
});

let router = express.Router();

router.post("/", (req, res) => {
    //TODO validate files
    const { heading, product, area, requestInfo, material, files } = req.body;

    const { errors, isValid } = requestValidator(req.body);

    let form = new formidable.IncomingForm();


    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({error: err.message});
        } else{
            const { product, name, email, phone, address, zipCode, material, description } = fields;
            const { errors, isValid } = requestValidator(fields);

            Object.keys(files).forEach((filename) => {
                cloudinary.uploader.upload(files[filename].path, (result) => {
                    db.requests.update({ email }, {$push: {"images": [result.secure_url]}});
                });
            });

            if (isValid){
                db.requests.insert(
                    { product,
                        name,
                        email,
                        phone,
                        address,
                        zipCode,
                        material,
                        description,
                        images: [],
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
        }

    });

});

router.get("/", (req, res) => {
    db.requests.find().sort({updated_at: -1 }, (err, requests) => {
        if(err){
            res.status(500).json({errors: err});
        } else{
            if(requests){
                res.json({errors: {}, requests});
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
