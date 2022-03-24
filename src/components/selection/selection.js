import React from 'react';
import {Select} from 'antd';
import PropTypes from 'prop-types';
import './selection.scss';

const {Option} = Select;

function Selection({placeholder, handleChange, values, value, label}) {

    const handleChangeInputValue = value => {
        handleChange(value);
    }
    return (
        <div className="selection">
            <div className="selection_label">
                {label}
            </div>
            <Select
                showSearch
                placeholder={placeholder}
                value={value}
                onChange={handleChangeInputValue}
                optionFilterProp="children"
                className="selection_input"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                {values.map((item, index) => (
                    <Option key={index} value={JSON.stringify(item)}>
                        {item.name}
                    </Option>
                ))}
            </Select>
        </div>
    )
}

Selection.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    values: PropTypes.array,
    label: PropTypes.string
}
export default Selection;