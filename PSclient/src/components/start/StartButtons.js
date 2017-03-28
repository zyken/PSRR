import React from "react";
import { Link } from "react-router";

class StartButtons extends React.Component {

    constructor(props){
        super(props);

        this.styles = {
            btnContainer: {
                marginTop: "40vh"
            },
            btn: {
                width: "100%",
                marginTop: "20px"
            }
        }
    }

    render(){
        return (
            <div className="container" style={this.styles.btnContainer}>
                <div className="row">
                    <div className="col-sm-6">
                        <Link to="repair"><button style={this.styles.btn} className="btn btn-primary btn-lg">Repair</button></Link>
                    </div>
                    <div className="col-sm-6">
                        <Link to="customize/create-request"><button style={this.styles.btn} className="btn btn-primary btn-lg">Customize</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default StartButtons;
