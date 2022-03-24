import React from 'react';
import PropTypes from 'prop-types';

function VedomostLine({vedomostId, date, year, discipline, typeOfControl, status, handleClick}) {

    const handleClickEdit = value => {
        handleClick(value);
    }
    return (
        <div className="student-line">
            <div className="journal_info_line">{vedomostId}</div>
            <div className="journal_info_line">{date}</div>
            <div className="journal_info_line">{year}</div>
            <div className="journal_info_line">{discipline}</div>
            <div className="journal_info_line">{typeOfControl}</div>
            <div className="journal_info_line">{status ? "проведена" : "не проведена"}</div>
            <button onClick={handleClickEdit}>Редактировать</button>
        </div>
    )
}

VedomostLine.propTypes = {
    vedomostId: PropTypes.string,
    date:PropTypes.string,
    year: PropTypes.string,
    discipline: PropTypes.string,
    typeOfControl: PropTypes.string,
    status: PropTypes.bool,
    handleClick: PropTypes.func
}
export default VedomostLine;