import React from 'react';
import {Select} from 'antd';
import PropTypes from 'prop-types';
import './student-line.scss';

const {Option} = Select;

function StudentLine({student, handleChange, grades, value}) {

    const handleChangeInputValue = value => {
        handleChange(value);
    }
    return (
        <div className="student-line">
            <div className="student-line_id">
                {student.id}
            </div>
            <div className="student-line_name">
                {student.student}
            </div>
            <Select
                showSearch
                value={value}
                onChange={handleChangeInputValue}
                optionFilterProp="children"
                className="student-line_input"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                {grades.map((item, index) => (
                    <Option key={index} value={item}>
                        {item}
                    </Option>
                ))}
            </Select>
        </div>
    )
}

StudentLine.propTypes = {
    value: PropTypes.string,
    handleChange: PropTypes.func,
    grades: PropTypes.array,
    student: PropTypes.array
}
export default StudentLine;