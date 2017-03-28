import React from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

class UploadFoto extends React.Component {
    constructor(props){
        super(props);

        this.styles = {
            btnFile: {
                position: "relative",
                overflow: "hidden",
                width: "100%",
                borderRadius: "5px 0 0 5px"
            },
            dropzoneContainer:{
            },
            dropzone:{

            },
            uploadBoxContainer:{
                height: "150px",
                marginTop: "10px",
                backgroundColor: "rgb(111, 234, 133)",
                position: "relative"
            },
            uploadImg: {
                width: "100%",
                maxHeight: "100%",
            },
            deleteImg: {
                position: "absolute",
                top: "0px",
                right: "10px",
                fontSize: "18px",
                cursor: "pointer",
                color: "red"
            }
        }
    }

    onDrop(acceptedFiles, rejectedFiles){
//        axios.post("/api/upload", acceptedFiles);
        this.props.addFiles(acceptedFiles);
    }

    displayUploadBoxes(){
        const { files, deleteFile } = this.props;
        let uploadBoxes = []
        for(let i = 0; i < 4; i++){
            uploadBoxes.push(
            <div className="col-md-3 col-xs-6" key={i}>
                <div style={this.styles.uploadBoxContainer}>
                    {(files[i]) && <span style={this.styles.deleteImg} onClick={deleteFile.bind(this, i)}>X</span>}
                    {(files[i]) && <img style={this.styles.uploadImg} src={files[i].preview} />}
                </div>
            </div>)
        }
        return uploadBoxes;
    }


    render(){
        return (
            <div style={this.styles.dropzoneContainer}>
                <Dropzone style={this.styles.dropzone}
                onDrop={this.onDrop.bind(this)}
                multiple={true}
                maxSize={300000}
                accept={"image/*"}
                >
                <label style={this.styles.btnFile} className="btn btn-default">
                   browse pictures
                </label>
                </Dropzone>
                <div className="row">
                    {this.displayUploadBoxes()}
                </div>
            </div>
        );
    }
}

UploadFoto.propTypes = {
    addFiles: React.PropTypes.func.isRequired,
    deleteFile: React.PropTypes.func.isRequired,
    files: React.PropTypes.array.isRequired
}



export default UploadFoto;




