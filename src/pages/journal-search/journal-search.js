import React, {useState} from 'react';
import Selection from '../../components/selection/selection';
import {discipline, groups, year, type} from '../../assets/data/selections';
import './journal-search.scss';
import {useHistory} from "react-router-dom";

function JournalSearch() {
    const [selectedGroup, setSelectedGroup] = useState("");
    const handleClickGroup = group => setSelectedGroup(group);
    const [selectedYear, setSelectedYear] = useState("");
    const handleClickYear = year => setSelectedYear(year);
    const [selectedDiscipline, setSelectedDiscipline] = useState("");
    const handleClickDiscipline = discipline => setSelectedDiscipline(discipline);
    const [selectedType, setSelectedType] = useState("");
    const handleClickType = type => setSelectedType(type);
    const history = useHistory();

    function handleClick(){
        history.push('/journal');
    }
    return (
        <div className="search">
            <div className="search_text">
                Для создания ведомости выберите параметры
            </div>
            <div className="search_selections">
                <div className="search_selections_border">
                    <Selection value={selectedYear} values={year} handleChange={handleClickYear} label={"Учебный год"}
                               placeholder={"Выберите учебный год"}/>
                    <Selection value={selectedGroup} values={groups} handleChange={handleClickGroup}
                               label={"Учебная группа"}
                               placeholder={"Выберите учебную группу"}/>
                    <Selection value={selectedDiscipline} values={discipline} handleChange={handleClickDiscipline}
                               label={"Дисциплина"}
                               placeholder={"Выберите дисциплину"}/>
                    <Selection value={selectedType} values={type} handleChange={handleClickType} label={"Вид контроля"}
                               placeholder={"Выберите вид контроля"}/>
                </div>
            </div>
            <button className="search_button" onClick={()=>handleClick()}>Создать ведомость</button>
        </div>
    );
}

export default JournalSearch;