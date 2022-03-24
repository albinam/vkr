import React, {useEffect, useState} from 'react';
import Selection from '../../components/selection/selection';
import './vedomost-search.scss';
import {useHistory} from "react-router-dom";
import {getDisciplines, getYears} from "../../assets/utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {setDiscipline, setYear} from "../../redux/actions/actions";

function VedomostSearch() {
    const years = useSelector((state) => state.years.years);
    const year = useSelector((state) => state.years.year);
    const teacher = useSelector((state) => state.teacher.teacherId);
    const handleClickYear = value => {
        dispatch(setYear(JSON.parse(value)));
        dispatch(getDisciplines(JSON.parse(value).id,teacher));
    };
    const disciplines = useSelector((state) => state.disciplines.disciplines);
    const discipline = useSelector((state) => state.disciplines.discipline);
    const handleClickDiscipline = value => {
        dispatch(setDiscipline(JSON.parse(value)));
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
            {(!loading) ?
                <div className="search">
                    <div className="search_text">
                        Для создания ведомости выберите параметры
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
                    <button className="search_button" onClick={() => handleClick()}>Создать ведомость</button>
                </div> : <div>gtgt</div>}
        </div>
    );
}

export default VedomostSearch;