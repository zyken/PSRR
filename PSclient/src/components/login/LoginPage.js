import React from "react";
import LoginForm from "./LoginForm";

import GlobalCssStyles from "../../css/global.css.js";

class LoginPage extends React.Component {
    render(){

        return(
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div style={{...GlobalCssStyles.container, ...GlobalCssStyles.bgcGray}}>
                        <LoginForm />
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
