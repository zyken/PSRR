import React from "react";



class UploadFoto extends React.Component {
    constructor(props){
        super(props);

        this.styles = {
            btnFile: {
                position: "relative",
                overflow: "hidden",
                width: "75%",
                borderRadius: "5px 0 0 5px"
            },
            btnFileInput: {
                position: "absolute",
                top: "0",
                right: "0",
                minWidth: "1020px",
                minHeight: "100%",
                textAlign: "right",
                opacity: "0",
                outline: "none",
                backgroundColor: "white",
                cursor: "inherit",
                display: "block"
            },
            submitFileBtn:{
                width: "25%",
                borderRadius: "0 5px 5px 0"
            }
        }
    }

    onClick(e){
        e.preventDefault();
        console.log(e);
        console.log("upload");
    }

    render(){
        return (
            <div>
                <label style={this.styles.btnFile} className="btn btn-default">
                   browse <input style={this.styles.btnFileInput} ref="uploadImage" type="file" name="image" accept="image/*" />
                </label>
                <button style={this.styles.submitFileBtn}
                        className="btn btn-primary"
                        onClick={this.onClick.bind(this)}
                        >Upload</button>
            </div>
        );
    }
}

export default UploadFoto;
