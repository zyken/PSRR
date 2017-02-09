import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function(data){
    let errors = {};

    for(let key of Object.keys(data)){
        if (typeof data[key] === "string"){
            if(Validator.isEmpty(data[key])){
                errors[key] = "This field is required";
            }
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
