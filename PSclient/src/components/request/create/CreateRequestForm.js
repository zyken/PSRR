import React from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
// import UploadFoto from "./UploadFoto";
import { connect } from "react-redux";
import { addRequest, getProducts, getAreas, getMaterials } from "../../../actions/requestActions";
import SelectFieldGroup from "../../common/SelectFieldGroup";
import SliderFieldGroup from "../../common/SliderFieldGroup";
import UploadFoto from "./UploadFoto";
import Validator from "validator";
import isEmpty from "lodash/isEmpty";
import { addFlashMessage } from "../../../actions/flashMessages";
import FormData from "form-data";

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
            product: "0",
            size: {
                value: 0,
                min: 0,
                max: 10
            },
            name: "",
            email: "",
            phone: "",
            address: "",
            zipCode: "",
            displaySize: false,
            material: "0",
            description: "",
            files: [],
            errors: {
                name: "This field is required",
                email: "This field is required",
                phone: "This field is required",
                address: "This field is required",
                zipCode: "This field is required",
                description: "This field is required"
            },
            isValid: false
        }

        this.styles = {
            description: {
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
        this.initSize(e);
    }

    initSize(e){
        if(e.target.name === "product"){
            if(e.target.value === "armbånd"){
                this.setState({size: {value: 20, min: 19, max: 22}, displaySize: true});
            } else if(e.target.value === "halskæder" || e.target.value === "ringe" ){
                this.setState({size: {value: 50, min: 0, max: 100}, displaySize: true});
            } else{
                this.setState({displaySize: false});
            }
        }
    }

    onSliderChange(e){
        const size = Object.assign({}, this.state.size, {value: e.target.value});
        this.setState({size});
    }


    onSubmit(e){
        e.preventDefault();

        const data = new FormData();


        data.append("product", this.state.product);
        data.append("size", this.state.size.value);
        data.append("name", this.state.name);
        data.append("email", this.state.email);
        data.append("phone", this.state.phone);
        data.append("address", this.state.address);
        data.append("zipCode", this.state.zipCode);
        data.append("material", this.state.material);
        data.append("description", this.state.description);

        this.state.files.forEach((file) => {
            data.append(file.name, file);
        });

        this.props.addRequest(data).then((res) =>{
            setTimeout(() => {
                this.setState(res.data);
                this.props.addFlashMessage({
                    type: "success",
                    text: "You have successfully created a new request"
                });
                this.context.router.push("/customize/search-request");
            },3000)
        }, (err) =>{
            this.setState(err.response.data);
            }
        );
    }

    addFiles(files){
        let newFiles = [];
        let nrOfFiles = this.state.files.length;
        for(let file of files) {
            if(nrOfFiles < 4){
                newFiles.push(file);
                nrOfFiles++;
            }
        }
        if(newFiles.length > 0){
            this.setState({files: [...this.state.files, ...newFiles]});
        }
    }

    deleteFile(fileIndex){
        let newArray = this.state.files.slice();
        newArray.splice(fileIndex, 1);
        this.setState({files: newArray});
    }


    render(){
        const { errors } = this.state;
        return(
                <form onSubmit={this.onSubmit.bind(this)}>
                    <SelectFieldGroup
                        field="product"
                        label="Product"
                        optionsDefaultValue="Select Product"
                        onChange={this.onChange.bind(this)}
                        options={this.props.getProducts()}
                        error={errors.product}
                    />
                    <SelectFieldGroup
                        label="Material"
                        field="material"
                        optionsDefaultValue="Select Material"
                        onChange={this.onChange.bind(this)}
                        options={this.props.getMaterials()}
                        error={this.state.errors.material}
                    />

                    {this.state.displaySize && (<SliderFieldGroup
                        label="Size"
                        field="size"
                        size={this.state.size.value}
                        min={this.state.size.min}
                        max={this.state.size.max}
                        onChange={this.onSliderChange.bind(this)}
                    />)}

                    <div className={"form-group " + (errors.description ? "has-error" : "")}>
                        <label className={"control-label "}> Description</label>
                        <textarea
                            style={this.styles.description}
                            placeholder="What do you request?"
                            name="description"
                            onChange={this.onChange.bind(this)}
                            className="form-control"
                            ></textarea>
                    </div>

                    <UploadFoto
                        addFiles={this.addFiles.bind(this)}
                        deleteFile={this.deleteFile.bind(this)}
                        files={this.state.files} />

                    <div className="row">
                        <div className="col-xs-6">
                            <TextFieldGroup
                                field="name"
                                label="Name"
                                value={this.state.name}
                                onChange={this.onChange.bind(this)}
                                error={errors.name}
                            />
                        </div>
                        <div className="col-xs-6">
                            <TextFieldGroup
                                field="email"
                                label="Email"
                                value={this.state.email}
                                onChange={this.onChange.bind(this)}
                                error={errors.email}
                                type="email"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <TextFieldGroup
                                field="phone"
                                label="Phone"
                                value={this.state.phone}
                                onChange={this.onChange.bind(this)}
                                error={errors.phone}
                            />
                        </div>
                        <div className="col-sm-4">
                            <TextFieldGroup
                                field="address"
                                label="Address"
                                value={this.state.address}
                                onChange={this.onChange.bind(this)}
                                error={errors.address}
                            />
                        </div>
                        <div className="col-sm-4">
                            <TextFieldGroup
                                field="zipCode"
                                label="Zip code"
                                value={this.state.zipCode}
                                onChange={this.onChange.bind(this)}
                                error={errors.zipCode}
                            />
                        </div>
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

/*
                    <TextFieldGroup
                        field="heading"
                        label="Heading"
                        value={heading}
                        onChange={this.onChange.bind(this)}
                        error={errors.heading}
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
                    />*/



CreateRequestForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(null, { addRequest, getProducts, getAreas, getMaterials, addFlashMessage })(CreateRequestForm);
