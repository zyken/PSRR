import React from "react";

class FlashMessage extends React.Component {

    onClick(){
        this.props.deleteFlashMessage(this.props.message.id);
    }

    render(){
        const { type, text } = this.props.message;
        return (
            <div className={"alert " +
                            ((type === "success") ? "alert-success" : "") +
                            ((type === "error") ? "alert-danger" : "")}>
                <button onClick={this.onClick.bind(this)}
                        className="close">
                    <span>&times;</span>
                </button>
                {text}
            </div>
        );
    }
}

FlashMessage.propTypes = {
    message: React.PropTypes.object.isRequired,
    deleteFlashMessage: React.PropTypes.func.isRequired,
}


export default FlashMessage;
