import React from 'react';
import {Select} from 'antd';
import PropTypes from 'prop-types';
import './student-line.css';

const {Option} = Select;

function StudentLine({studentId,studentName, studentRecordBook, studentMark, studentGroup, handleChange, grades}) {

    const handleChangeInputValue = value => {
        handleChange(value,studentId);
    }
    return (
        <tr className="student-line">
            <td className="student-line_record-book">
                {studentRecordBook}
            </td>
            <td className="student-line_group">
                {studentGroup}
            </td>
            <td className="student-line_name">
                {studentName}
            </td>
            <td className="student-line_input">
            <Select
                showSearch
                value={studentMark}
                onChange={handleChangeInputValue}
                optionFilterProp="children"
                className="student-line_input"
                notFoundContent="Информация не найдена"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                {grades.map((item, index) => (
                    <Option key={index} value={JSON.stringify(item)}>
                        {item.gradeName}
                    </Option>
                ))}
            </Select>
            </td>
        </tr>
    )
}

StudentLine.propTypes = {
    handleChange: PropTypes.func,
    studentId:PropTypes.string,
    grades: PropTypes.array,
    studentName: PropTypes.string,
    studentRecordBook: PropTypes.string,
    studentMark: PropTypes.string,
    studentGroup: PropTypes.string
}
export default StudentLine;