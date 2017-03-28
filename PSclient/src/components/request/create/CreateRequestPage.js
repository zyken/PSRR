import React from "react";
import CreateRequestForm from "./CreateRequestForm";
import GlobalCssStyles from "../../../css/global.css.js";



class CreateRequestPage extends React.Component {
    constructor(props){
        super(props);
        this.styles = {
            overflowAuto: {
                overflow: "auto"
            }
        }
    }

    render(){
        return(
            <div>
                <div style={{...GlobalCssStyles.container, ...GlobalCssStyles.bgcGray, ...this.styles.overflowAuto}}>
                    <CreateRequestForm />
                </div>
            </div>
        );
    }
}


export default CreateRequestPage;
