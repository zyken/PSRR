import React from "react";
import SearchRequestItem from "./SearchRequestItem";
import { getRequests } from "../../../actions/requestActions"
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";

class SearchRequestList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            errors: {},
            requests: []
        }
        this.styles = {
            ul: {
                paddingLeft: "0px"
            }
        }
    }


    componentWillMount(){
        //const intervalId = setInterval(() => {
            this.props.getRequests();
        //},5000);
        //this.setState({ intervalId });
    }

    compoenntWillUnmount(){
        //clearInterval(this.state.intervalId);
    }

    displayUsers(){
        if(this.props.request.requestsData.requests){
            if(isEmpty(this.props.request.requestsData.errors)){
                return this.props.request.requestsData.requests.map((request, index) => {
                    return (
                        <SearchRequestItem key={index} request={request} />
                    );
                });
            }
        }
    }

    render(){
        return (
            <div>
                <ul style={this.styles.ul}>
                    {this.displayUsers()}
                </ul>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        request: state.request
    };
}

export default connect(mapStateToProps, { getRequests })(SearchRequestList);
