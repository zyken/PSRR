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
                height: "80px",
                background: "white",
                textAlign: "center",
                lineHeight: "80px"
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

    render(){
        const { user } = this.props;
        return (
            <li className="row" style={this.styles.li}>
                <div className="col-md-12" style={{...this.styles.container, ...GlobalCssStyles.container}}>
                    <div className="row">
                        <div className="col-md-2" style={this.styles.listImg}>
                            Image
                        </div>
                        <div className="col-md-4">
                            <div style={this.styles.heading}>
                                <h4 style={this.styles.h4}>{user.heading}</h4>
                            </div>
                            <div style={this.styles.productInfo}>
                                Product: {user.product}
                            </div>
                            <div style={this.styles.productInfo}>
                                Area: {user.area}
                            </div>
                            <div style={this.styles.productInfo}>
                                Material: {user.material}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div style={this.styles.heading}>
                                <h4 style={this.styles.h4}>
                                    Request info:</h4>
                            </div>
                            {user.requestInfo}
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
    user: React.PropTypes.object.isRequired
}

export default SearchRequestItem;
