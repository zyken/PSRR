import React from "react";
import SearchRequestForm from "./SearchRequestForm";
import GlobalCssStyles from "../../../css/global.css.js";
import SearchRequestList from "./SearchRequestList";

class SearchRequestPage extends React.Component {

    constructor(props){
        super(props);
        this.styles = {
            searchRequestList:{
                marginTop: "10px"
            }
        }
    }

    render(){
        return(
            <div>
                <div style={{...GlobalCssStyles.container, ...GlobalCssStyles.bgcGray}}>
                    <SearchRequestForm />
                </div>
                <div style={{...GlobalCssStyles.container, ...GlobalCssStyles.bgcGray, ...this.styles.searchRequestList}}>
                    <SearchRequestList />
                </div>
            </div>
        );
    }
}

export default SearchRequestPage;
