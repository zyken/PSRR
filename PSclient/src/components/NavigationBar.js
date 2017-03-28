import React from "react";
import { Link } from "react-router"
import { connect } from "react-redux";
import { logout } from "../actions/authActions";

class NavigationBar extends React.Component {

    logout(e){
        e.preventDefault();
        this.props.logout();
    }

    render(){
        const { isAuthenticated } = this.props.auth;

        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link activeStyle={{color: "#375a7f"}} to="/customize/search-request">Search request</Link></li>
                <li><Link activeStyle={{color: "#375a7f"}} to="/customize/create-request">Create request</Link></li>
                <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
            </ul>
        );



        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link activeStyle={{color: "#375a7f"}} to="/customize/search-request">Search request</Link></li>
                <li><Link activeStyle={{color: "#375a7f"}} to="/customize/create-request">Create request</Link></li>
                <li><Link activeStyle={{color: "#375a7f"}} to="/customize/signup">Sign up</Link></li>
                <li><Link activeStyle={{color: "#375a7f"}} to="/customize/login">Login</Link></li>
            </ul>
        );



        return (
            <nav className="navbar navbar-inverse navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link activeStyle={{color: "#375a7f"}} to="/" className="navbar-brand">Smykker</Link>
                    </div>

                    <div id="navbar" className="navbar-collapse collapse">
                        { isAuthenticated ? userLinks : guestLinks }
                    </div>
                </div>
            </nav>
        );
    }
}

NavigationBar.propTypes = {
    auth: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired,
}

function mapStateToProps(state){
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
