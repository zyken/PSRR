import React from "react";
import CreateRequestForm from "./CreateRequestForm";
import GlobalCssStyles from "../../../css/global.css.js";

class CreateRequestPage extends React.Component {
    render(){
        return(
            <div>
                <div style={{...GlobalCssStyles.container, ...GlobalCssStyles.bgcGray}} className="col-md-4 col-md-offset-4">
                    <CreateRequestForm />
                </div>
            </div>
        );
    }
}


export default CreateRequestPage;
