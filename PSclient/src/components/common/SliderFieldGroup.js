import React from "react";

class SliderFieldGroup extends React.Component {
    render(){
        const {label, size, field, onChange, min, max} = this.props;
        return(
            <div className="form-group">
                <label className="control-label"> {label} <span style={{color: "#009871"}}>{size}</span>cm </label>
                <input
                    className="form-control"
                    type="range"
                    onChange={onChange}
                    name={field}
                    min={min}
                    max={max}
                    value={size}
                />
            </div>
        );
    }
}

export default SliderFieldGroup;

