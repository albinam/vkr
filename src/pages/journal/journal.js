import React from 'react';
import './journal.scss';
import PropTypes from "prop-types";
import {students} from "../../assets/data/students";
import {gradesEx, gradesZa} from "../../assets/data/students";
import StudentLine from "../../components/student-line/student-line";

function Journal({year, discipline, type}) {
    const gr = type === "зачет" ? gradesZa : gradesEx;
    return (
        <div className="journal">
            <div className="journal_info">
                <div className="journal_info_box">
                    <div className="journal_info_line">Учебная группа:</div>
                    <div className="journal_info_line">Учебный год: {year}</div>
                    <div className="journal_info_line">Дисциплина: {discipline}</div>
                    <div className="journal_info_line">Вид контроля: {type}</div>
                </div>
                {students.map((item, index) => (
                    <StudentLine key={index} student={item} grades={gr}/>
                ))
                }
                <div className="journal_info_code-label">Код подтверждения</div>
                <input className="journal_info_code-input" type="text"/>
                <a href="/">Выслать код подтверждения</a>
                <button className="journal_info_button" onClick>Сохранить</button>
            </div>
        </div>
    );
}

Journal.propTypes = {
    group: PropTypes.string,
    year: PropTypes.string,
    type: PropTypes.string,
    discipline: PropTypes.string
}

export default Journal;