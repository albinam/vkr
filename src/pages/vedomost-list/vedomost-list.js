import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getVedomosti} from "../../assets/utils/utils";
import VedomostLine from "../../components/vedomost-line/vedomost-line";
import moment from "moment";
import {useHistory} from "react-router-dom";

function Vedomost() {
    const vedomosti = useSelector((state) => state.vedomost.vedomosti);
    const teacher = useSelector((state) => state.teacher.teacherId);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const params = new URLSearchParams(window.location.search);
    const history = useHistory();
    const handleClick = (value) => {
        history.push(`/vedomost?vedomostId=${value}`);
    }
    useEffect(() => {
        setLoading(true);
        if (vedomosti.length === 0){
            dispatch(getVedomosti(params.get("yearId"), teacher, params.get("disciplineId")))
        }
        else {
            setLoading(false)
        }
    }, [vedomosti]);
    return (
        <div>
            {!(loading) ?
                <div className="vedomost">
                    <div className="vedomost_info">
                        <div className="journal_info_line">Номер ведомости:</div>
                        <div className="journal_info_line">Дата:</div>
                        <div className="journal_info_line">Учебный год:</div>
                        <div className="journal_info_line">Дисциплина:</div>
                        <div className="journal_info_line">Вид контроля:</div>
                        <div className="journal_info_line">Статус:</div>
                    </div>
                    {vedomosti.map((item, index) => (
                        <VedomostLine key={index} year={item.yearName} date={moment(item.vedomostDate).format("DD/MM/YY, h:mm")}
                                      discipline={item.disciplineName} vedomostId={item.vedomostId} status={item.status}
                                      typeOfControl={item.typeOfControl} handleClick={()=>handleClick(item.vedomostId)}/>
                    ))}
                </div> : <div>vrfvfr</div>}
        </div>
    );
}


export default Vedomost;