import React from "react";
import GlobalCssStyles from "../../../css/global.css.js";

class SearchRequestItem extends React.Component {

    constructor(props){
        super(props);

        this.styles = {
            container: {
                backgroundColor: "#c8cac8",
                color: "black"
            },
            li: {
                listStyle: "none"
            },
            listImg: {
                height: "100px",
            },
            h4:{
                margin: "0"
            },
            heading:{
                borderBottom: "1px solid #bbbbbb",
                paddingBottom: "5px"
            },
            productInfo:{
                marginTop: "10px"
            },
            seeMoreBtn:{
                width: "100%"
            }
        }
    }

    displayDate(date) {
        let d = new Date(date);

        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
    }

    render(){
        const { request } = this.props;

        return (
            <li className="row" style={this.styles.li}>
                <div className="col-md-12" style={{...this.styles.container, ...GlobalCssStyles.container}}>
                    <div className="row">
                        {request.images[0] && <img className="col-md-2" style={this.styles.listImg} src={request.images[0]} />}
                        <div className="col-md-4">
                            <div style={this.styles.heading}>
                                <h4 style={this.styles.h4}>{request.product}</h4>
                            </div>
                            <div style={this.styles.productInfo}>
                                Product: {request.product}
                            </div>
                            <div style={this.styles.productInfo}>
                                Material: {request.material}
                            </div>
                            <div style={this.styles.productInfo}>
                                Slået op: {this.displayDate(request.created_at)}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div style={this.styles.heading}>
                                <h4 style={this.styles.h4}>
                                    Description:</h4>
                            </div>
                            {request.description}
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-info" style={this.styles.seeMoreBtn}>See more</button>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

SearchRequestItem.propTypes = {
    request: React.PropTypes.object.isRequired
}

export default SearchRequestItem;
