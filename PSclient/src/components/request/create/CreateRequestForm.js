import React from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
// import UploadFoto from "./UploadFoto";
import { connect } from "react-redux";
import { addRequest, getProducts, getAreas, getMaterials } from "../../../actions/requestActions";
import SelectFieldGroup from "../../common/SelectFieldGroup";
import Validator from "validator";
import isEmpty from "lodash/isEmpty";
import { addFlashMessage } from "../../../actions/flashMessages";

function requestValidator(data){
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


class CreateRequestForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            heading: "",
            product: "0",
            area: "0",
            "material": "0",
            requestInfo: "",
            errors: {
                heading: "This field is requried",
                requestInfo: "This field is required"
            },
            isValid: false
        }

        this.styles = {
            requestInfo: {
                height: "150px",
                marginBottom: "10px",
                resize: "none"
            },
            submit:{
                margin: "10px 0",
                width: "100%"
            }
        }

    }

    isValid(){
        const { errors, isValid } = requestValidator(this.state);
        this.setState({errors: errors, isValid});
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.isValid();
        });

    }

    onSubmit(e){
        e.preventDefault();
        this.props.addRequest(this.state).then((res) =>{
            this.setState(res.data);
            this.props.addFlashMessage({
                type: "success",
                text: "You have successfully created a new request"
            });
            this.context.router.push("/search-request");
        }, (err) =>{
            this.setState(err.response.data);
            }
        );
    }

    render(){
        const { heading, errors } = this.state;
        return(
                <form onSubmit={this.onSubmit.bind(this)}>
                    <TextFieldGroup
                        field="heading"
                        label="Heading"
                        value={heading}
                        onChange={this.onChange.bind(this)}
                        error={errors.heading}
                    />
                    <SelectFieldGroup
                        field="product"
                        label="Product"
                        optionsDefaultValue="Select Product"
                        onChange={this.onChange.bind(this)}
                        options={this.props.getProducts()}
                        error={errors.product}
                    />

                    <SelectFieldGroup
                        label="Area"
                        field="area"
                        optionsDefaultValue="Select Area"
                        onChange={this.onChange.bind(this)}
                        options={this.props.getAreas()}
                        error={errors.area}
                    />

                    <SelectFieldGroup
                        label="Material"
                        field="material"
                        optionsDefaultValue="Select Material"
                        onChange={this.onChange.bind(this)}
                        options={this.props.getMaterials()}
                        error={errors.material}
                    />

                    <div className={"form-group " + (errors.requestInfo ? "has-error" : "")}>
                        <label className={"control-label "}> Request Info </label>
                        <textarea
                            style={this.styles.requestInfo}
                            placeholder="What do you request?"
                            name="requestInfo"
                            onChange={this.onChange.bind(this)}
                            className="form-control"
                            ></textarea>
                    </div>
                    <button
                        disabled={!this.state.isValid}
                        style={this.styles.submit}
                        type="submit"
                        className="btn btn-primary">Submit</button>
                </form>
        );
    }
}

CreateRequestForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(null, { addRequest, getProducts, getAreas, getMaterials, addFlashMessage })(CreateRequestForm);
