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
            users: []
        }
        this.styles = {
            ul: {
                paddingLeft: "0px"
            }
        }
    }


    componentWillMount(){
        this.props.getRequests();
    }

    displayUsers(){
        if(this.props.request.usersData.users){
            if(isEmpty(this.props.request.usersData.errors)){
                return this.props.request.usersData.users.map((user, index) => {
                    return (
                        <SearchRequestItem key={user._id} user={user} />
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
