import React, {useEffect, useState} from 'react';
import './vedomost.css';
import {useDispatch, useSelector} from "react-redux";
import {downloadVed, getGrades, getVedomost, postVedomost} from "../../assets/utils/requests";
import moment from "moment";
import StudentLine from "../../components/student-line/student-line";
import {setVedomost} from "../../redux/actions/actions";
import Loader from "../../components/loader/loader";
import {success} from "../../assets/utils/error";

function Vedomost() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const vedomost = useSelector((state) => state.vedomost.vedomost);
    const grades = useSelector((state) => state.vedomost.grades);
    const params = new URLSearchParams(window.location.search);

    const handleChange = (value, studentId) => {
        let ved = {...vedomost};
        ved.students.forEach(function (element) {
            if (element.studentId === studentId) {
                element.studentMarkName = JSON.parse(value).gradeName;
                element.studentMarkId = JSON.parse(value).gradeId;
            }
        });
        dispatch(setVedomost(ved));
    }

    const handleClickSave = () => {
        setLoading(true);
        postVedomost(vedomost.students, vedomost.vedomostId).then(r => {
            if (r) {
                setLoading(false);
                success();
            }
        });
    }
    const handleClickDownload = () => {
        downloadVed(params.get('vedomostId'))
    }

    useEffect(() => {
        setLoading(true);
        if (!(vedomost)) {
            dispatch(getVedomost(params.get('vedomostId')));
        } else {
            setLoading(false);
            if (grades.length === 0) {
                dispatch(getGrades(vedomost.gradesSystemId))
            }
        }
    });
    return (
        <div>
            {(loading) ? <Loader/> :
                <div className="vedomost">
                    <div className="vedomost_info">
                        <div className="vedomost_info_box">
                            <div className="vedomost_info_line">
                                <div className="vedomost_info_line_title">Номер ведомости:</div>
                                <div className="vedomost_info_line_text">{vedomost.vedomostId}</div>
                            </div>
                            <div className="vedomost_info_line">
                                <div
                                    className="vedomost_info_line_title">Дата:
                                </div>
                                <div
                                    className="vedomost_info_line_text">{moment(vedomost.vedomostDate).format("DD/MM/YY, h:mm")}</div>
                            </div>
                            <div className="vedomost_info_line">
                                <div className="vedomost_info_line_title">Учебный год:</div>
                                <div className="vedomost_info_line_text">{vedomost.yearsName}</div>
                            </div>
                            <div className="vedomost_info_line">
                                <div className="vedomost_info_line_title">Дисциплина:</div>
                                <div className="vedomost_info_line_text">{vedomost.disciplineName}</div>
                            </div>
                            <div className="vedomost_info_line">
                                <div className="vedomost_info_line_title">Преподаватель:</div>
                                <div
                                    className="vedomost_info_line_text">{vedomost.teacher[0].teacherSurname + " " + vedomost.teacher[0].teacherName + " " + vedomost.teacher[0].teacherPatronymic}</div>
                            </div>
                            <div className="vedomost_info_line">
                                <div className="vedomost_info_line_title">Вид контроля:</div>
                                <div className="vedomost_info_line_text">{vedomost.typeOfControl}</div>
                            </div>
                            <div className="vedomost_info_line">
                                <div className="vedomost_info_line_title">Система оценивания:</div>
                                <div className="vedomost_info_line_text">{vedomost.gradesSystemName}</div>
                            </div>
                            <div className="vedomost_info_line">
                                <div className="vedomost_info_line_title">Статус:</div>
                                <div
                                    className="vedomost_info_line_text">{vedomost.status ? "Проведена" : "Не проведена"}</div>
                            </div>
                        </div>
                        <table className="vedomost_table_info">
                            <thead>
                            <tr>
                                <th className="vedomost_table_info_record-book">Номер зачетной книжки</th>
                                <th className="vedomost_table_info_group">Группа</th>
                                <th className="vedomost_table_info_fio">ФИО</th>
                                <th className="vedomost_table_info_mark">Отметка</th>
                            </tr>
                            </thead>
                            <tbody>
                            {vedomost.students.map((item, index) => (
                                <StudentLine key={index} studentId={item.studentId} studentName={item.studentName}
                                             studentGroup={item.studentGroup}
                                             studentMark={item.studentMarkName}
                                             studentRecordBook={item.studentRecordBook} handleChange={handleChange}
                                             grades={grades}/>
                            ))}
                            </tbody>
                        </table>
                        <div className="vedomost_code-label">Код подтверждения</div>
                        <input className="vedomost_code-input" type="text"/>
                        <a href="/">Выслать код подтверждения</a>
                        <div className="vedomost_button_container">
                            <button onClick={handleClickSave} className="vedomost_button">Сохранить</button>
                            <button onClick={handleClickDownload} className="vedomost_button">Скачать</button>
                        </div>
                    </div>
                </div>}
        </div>
    );
}


export default Vedomost;