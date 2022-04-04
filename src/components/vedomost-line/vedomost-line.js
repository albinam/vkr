import React from 'react';
import PropTypes from 'prop-types';
import "./vedomost-line.css";
import {ReactComponent as Checked} from '../../assets/images/checked.svg';
import {ReactComponent as Unchecked} from '../../assets/images/unchecked.svg';
import moment from "moment";

function VedomostLine({vedomostId, date, typeOfControl, status, group, semester, handleClick}) {

    const handleClickEdit = value => {
        handleClick(value);
    }

    return (
        <tr className="vedomost_line_container">
            <td className="vedomost_line">{vedomostId}</td>
            <td className="vedomost_line">{moment(date).format("DD/MM/YY, h:mm")}</td>
            <td className="vedomost_line">{semester}</td>
            <td className="vedomost_line">
                {group}
            </td>
            <td className="vedomost_line">{typeOfControl}</td>
            <td className="vedomost_line">{status ? <Checked/> : <Unchecked/>}</td>
            <td className="vedomost_line">
                <button className="vedomost_button" onClick={handleClickEdit}>Редактировать</button>
            </td>
        </tr>
    )
}

VedomostLine.propTypes = {
    vedomostId: PropTypes.string,
    date: PropTypes.string,
    group: PropTypes.string,
    semester: PropTypes.string,
    typeOfControl: PropTypes.string,
    status: PropTypes.string,
    handleClick: PropTypes.func
}
export default VedomostLine;