import React from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";

import Validator from "validator";
import isEmpty from "lodash/isEmpty";

function validateLoginInputs(data){
    let errors = {};

    if(Validator.isEmpty(data.identifier)){
        errors.identifier = "This field is required";
    }

    if(Validator.isEmpty(data.password)){
        errors.password = "This field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}



class LoginForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            identifier: "",
            password: "",
            errors: {},
            isLoading: false
        }
    }

    isValid(){
        const { errors, isValid } = validateLoginInputs(this.state);

        if(!isValid){
            this.setState({errors});
        }

        return isValid;
    }

    onSubmit(e){
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.login(this.state).then(
                (res) => this.context.router.push("/"),
                (err) => {
                    this.setState({errors: err.response.data.errors, isLoading: false});
                }
            );
        }
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    render(){
        const { errors, identifier, password, isLoading } = this.state;
        return(
            <form onSubmit={this.onSubmit.bind(this)}>
                <h1>login</h1>

                { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                <TextFieldGroup
                    field="identifier"
                    label="Username / Email"
                    value={identifier}
                    error={errors.identifier}
                    onChange={this.onChange.bind(this)}
                 />

                 <TextFieldGroup
                    field="password"
                    label="Password"
                    value={password}
                    error={errors.password}
                    onChange={this.onChange.bind(this)}
                    type="password"
                 />

                <div className="form-group">
                    <button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button>
                </div>
            </form>
        );
    }
}

LoginForm.proptypes ={
    login: React.PropTypes.func.isRequired,
}

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired,
}

export default connect(null, { login })(LoginForm);
