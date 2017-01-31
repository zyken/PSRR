import React from "react";
import isEmpty from "lodash/isEmpty";
import TextFieldGroup from "../common/TextFieldGroup";

import { connect } from "react-redux";
import { userSignupRequest, isUserExists } from "../../actions/signupActions";
import { addFlashMessage } from "../../actions/flashMessages";


import Validator from "validator";


function validateSignupInput(data){
    let errors = {};

    if(Validator.isEmpty(data.username)){
        errors.username = "This field is required";
    }
    if(Validator.isEmpty(data.email)){
        errors.email = "This field is required";
    }
    if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }
    if(Validator.isEmpty(data.password)){
        errors.password = "This field is required";
    }
    if(Validator.isEmpty(data.passwordConfirmation)){
        errors.passwordConfirmation = "This field is required";
    }
    if(!Validator.equals(data.password, data.passwordConfirmation)){
        errors.passwordConfirmation = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class SignupForm extends React.Component {

    constructor(props) {
        super(props);

        this.state= {
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            errors: {},
            isLoading: false,
            invalid: false,
        }
    }

    onChange(e){
        let errors = Object.assign({},this.state.errors);
        delete errors[e.target.name];

        this.setState({
            [e.target.name]: e.target.value,
            errors,
            invalid: !isEmpty(errors),
        });
    }

    isValid(){
        const { errors, isValid } = validateSignupInput(this.state);

        if(!isValid){
            this.setState({errors});
        }

        return isValid;
    }

    checkUserExists(e){
        const field = e.target.name;
        const val = e.target.value;
        if(val !== ''){
            this.props.isUserExists(val).then(res => {
                let invalid;
                let errors = Object.assign({},this.state.errors);
                if(res.data.user){
                    errors[field] = capitalizeFirstLetter(field) + " does already exists";
                    invalid = true;
                } else{
                    delete errors[field];
                    invalid = !isEmpty(errors);
                }

                this.setState({ errors, invalid });
            });
        }
    }

    onSubmit(e){
        e.preventDefault();

        if(this.isValid()){
            this.setState({errors: {}, isLoading: true});
            this.props.userSignupRequest(this.state)
            .then(() =>  {
                this.props.addFlashMessage({
                    type: "success",
                    text: "You signed up successfully. Welcome!"
                })
                this.context.router.push("/");
            },
            (err) => this.setState(
                {
                    errors: err.response.data.errors,
                    isLoading: false
                }
            ));
        }
    }

    render(){
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <h1>Join our community!</h1>

                <TextFieldGroup
                    error={errors.username}
                    label={"Username"}
                    onChange={this.onChange.bind(this)}
                    checkUserExists={this.checkUserExists.bind(this)}
                    value={this.state.username}
                    field="username" />

                <TextFieldGroup
                    error={errors.email}
                    label={"Email"}
                    onChange={this.onChange.bind(this)}
                    checkUserExists={this.checkUserExists.bind(this)}
                    value={this.state.email}
                    field="email"
                    type="email" />

                <TextFieldGroup
                    error={errors.password}
                    label={"Password"}
                    onChange={this.onChange.bind(this)}
                    value={this.state.password}
                    field="password"
                    type="password" />

                <TextFieldGroup
                    error={errors.passwordConfirmation}
                    label={"Repeat Password"}
                    onChange={this.onChange.bind(this)}
                    value={this.state.passwordConfirmation}
                    field="passwordConfirmation"
                    type="password" />

                <div className="form-group">
                    <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
                        Sign up
                    </button>
                </div>
            </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    isUserExists: React.PropTypes.func.isRequired,
}

SignupForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default connect(null, { userSignupRequest, addFlashMessage, isUserExists })(SignupForm);
