import React from "react";
import SignupForm from "./SignupForm";
import GlobalCssStyles from "../../css/global.css.js";

class SignupPage extends React.Component {

    render(){
        return(
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                <div style={{...GlobalCssStyles.container, ...GlobalCssStyles.bgcGray}}>
                    <SignupForm />
                </div>
                </div>
            </div>
        );
    }
}


export default SignupPage;
