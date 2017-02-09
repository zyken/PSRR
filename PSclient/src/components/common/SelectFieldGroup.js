import React from "react";
import { capitalizeFirstLetter } from "../../actions/commonActions";


class SelectFieldGroup extends React.Component {

    displayOptions(options){
        return (
            options.map((option, index) => {
                return <option key={index} value={option}>{capitalizeFirstLetter(option)}</option>
            })
        )
    }

    render(){
        const { label, onChange, field, optionsDefaultValue, options, error } = this.props;

        return(
            <div className="form-group">
                <label className={"control-label " + (error ? "has-error" : "")}> {label} </label>
                <select onChange={onChange} name={field} className="form-control">
                    <option value="0">{optionsDefaultValue}</option>
                    {this.displayOptions(options)}
                </select>
            </div>
        );
    }
}

SelectFieldGroup.propTypes = {
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    field: React.PropTypes.string.isRequired,
    optionsDefaultValue: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    error: React.PropTypes.object,
}

export default SelectFieldGroup;
