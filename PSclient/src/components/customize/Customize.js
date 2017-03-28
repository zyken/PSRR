import React from "react";
import NavigationBar from "../NavigationBar";
import FlashMessagesList from "../flash/FlashMessagesList";


class Customize extends React.Component {
    render(){
        return (
            <div className="container">
                <NavigationBar />
                <FlashMessagesList />
                {this.props.children}
            </div>
        );
    }
}

export default Customize;
