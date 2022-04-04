import React, {useEffect, useState} from 'react';
import Selection from '../../components/selection/selection';
import './vedomost-search.css';
import {useHistory} from "react-router-dom";
import {getDisciplines, getYears} from "../../assets/utils/requests";
import {useDispatch, useSelector} from "react-redux";
import {setDiscipline, setDisciplines, setVedomosti, setYear} from "../../redux/actions/actions";
import Loader from "../../components/loader/loader";

function VedomostSearch() {
    const years = useSelector((state) => state.years.years);
    const year = useSelector((state) => state.years.year);
    const teacher = useSelector((state) => state.teacher.teacherId);
    const handleClickYear = value => {
        dispatch(setDisciplines([]));
        dispatch(setYear(JSON.parse(value)));
        dispatch(getDisciplines(JSON.parse(value).id,teacher));
        dispatch(setVedomosti([]));
    };
    const disciplines = useSelector((state) => state.disciplines.disciplines);
    const discipline = useSelector((state) => state.disciplines.discipline);
    const handleClickDiscipline = value => {
        dispatch(setDiscipline(JSON.parse(value)));
        dispatch(setVedomosti([]));
    };
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();

    function handleClick() {
        history.push(`/vedomosti?teacherId=${teacher}&yearId=${year.id}&disciplineId=${discipline.id}`);
    }

    useEffect(() => {
        setLoading(true)
        if (years.length===0) {
            dispatch(getYears());
        }
        if (years.length!==0) {
            setLoading(false)
        }
    },[years]);

    return (
        <div>
            {(loading) ? <Loader/> :
                <div className="search">
                    <div className="search_text">
                        Для поиска ведомости выберите параметры
                    </div>
                    <div className="search_selections">
                        <div className="search_selections_border">
                            <Selection value={(year)?year.name:null} values={years} handleChange={handleClickYear} label={"Учебный год"}
                                       placeholder={"Выберите учебный год"}/>
                            <Selection value={(discipline)?discipline.name:null} values={disciplines}
                                       handleChange={handleClickDiscipline}
                                       label={"Дисциплина"}
                                       placeholder={"Выберите дисциплину"}/>
                        </div>
                    </div>
                    <button className="search_button" onClick={() => handleClick()}>Найти ведомости</button>
                </div>}
        </div>
    );
}

export default VedomostSearch;