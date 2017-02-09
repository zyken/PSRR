import React from "react";
import TextFieldGroup from "../../common/TextFieldGroup";
import SelectFieldGroup from "../../common/SelectFieldGroup";
import { getProducts, getAreas, getMaterials, addSearchFormInput } from "../../../actions/requestActions";
import { connect } from "react-redux";

class SearchRequestForm extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            searchBox: "",
            product: "0",
            area: "0",
            material: "0",
            errors: {}
        }

        this.styles = {
            searchBoxBtn:{
                width: "100%",
                marginTop: "15px"
            }
        }
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        this.props.addSearchFormInput(this.state);
    }

    render(){
        const { searchBox, errors } = this.state;
        return(
            <form onSubmit={this.onSubmit.bind(this)}>
                <TextFieldGroup
                    field="searchBox"
                    value={searchBox}
                    label="Search Box"
                    error={errors.searchBox}
                    onChange={this.onChange.bind(this)}
                />
                <div className="row">
                    <div className="col-md-3 col-sm-4">
                        <SelectFieldGroup
                            label="Product"
                            onChange={this.onChange.bind(this)}
                            field="product"
                            optionsDefaultValue="Select Product"
                            options={this.props.getProducts()}
                            error={errors.product}
                        />
                    </div>
                    <div className="col-md-3 col-sm-4">
                        <SelectFieldGroup
                            label="Area"
                            onChange={this.onChange.bind(this)}
                            field="area"
                            optionsDefaultValue="Select Area"
                            options={this.props.getAreas()}
                            error={errors.area}
                        />
                    </div>
                    <div className="col-md-3 col-sm-4">
                        <SelectFieldGroup
                            label="Material"
                            onChange={this.onChange.bind(this)}
                            field="material"
                            optionsDefaultValue="Select Material"
                            options={this.props.getMaterials()}
                            error={errors.material}
                        />
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <button
                            type="submit"
                            style={this.styles.searchBoxBtn}
                            className="btn btn-primary
                            btn-lg"
                        >
                        Search
                        </button>
                    </div>
                </div>

            </form>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        request: state.request
    };
}

export default connect(mapStateToProps, { addSearchFormInput, getProducts, getAreas, getMaterials })(SearchRequestForm);
