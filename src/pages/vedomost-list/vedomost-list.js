import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getVedomosti} from "../../assets/utils/requests";
import VedomostLine from "../../components/vedomost-line/vedomost-line";
import "./vedomost-list.css";
import {useHistory} from "react-router-dom";
import Loader from "../../components/loader/loader";
import {setFiltered, setGroup, setGroups, setVedomost} from "../../redux/actions/actions";
import {Select} from "antd";
const {Option} = Select;

function Vedomost() {
    const vedomosti = useSelector((state) => state.vedomost.vedomosti);
    const filteredVedomosti = useSelector((state) => state.vedomost.filteredVedomosti);
    const teacher = useSelector((state) => state.teacher.teacherId);
    const groups = useSelector((state) => state.group.groups);
    const group = useSelector((state) => state.group.group);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const params = new URLSearchParams(window.location.search);
    const history = useHistory();
    const handleClick = (value) => {
        history.push(`/vedomost?vedomostId=${value}`);
        dispatch(setVedomost());
    }

    const handleClickGroup = (value) => {
        dispatch(setGroup(value));
        let newVedomosti = vedomosti.filter(ved => ved.groupName === value);
        dispatch(setFiltered(newVedomosti));
    }

    const removeFilter = () => {
        dispatch(setFiltered(vedomosti));
        dispatch(setGroup());
    }

    useEffect(() => {
        setLoading(true);
        if (vedomosti.length === 0) {
            dispatch(getVedomosti(params.get("yearId"), teacher, params.get("disciplineId")));
        }
        else {
            if (groups.length === 0) {
                const groups = [];
                vedomosti.map((item) => {
                    if (item.groupName && !groups.includes(item.groupName)) {
                        groups.push(item.groupName);
                    }
                })
                dispatch(setGroups(groups));
            }
            setLoading(false);
        }
    }, [vedomosti]);
    return (
        <div>
            {(loading) ? <Loader/> :
                <div className="vedomost-list_container">
                    <div className="vedomost-list_info">
                        <div className="vedomost-list_info_box">
                            <div className="vedomost-list_info_line">
                                <div className="vedomost-list_info_line_title">Учебный год:</div>
                                <div className="vedomost-list_info_line_text">{filteredVedomosti[0].yearName}</div>
                            </div>
                            <div className="vedomost-list_info_line">
                                <div className="vedomost-list_info_line_title">Дисциплина:</div>
                                <div className="vedomost-list_info_line_text">{filteredVedomosti[0].disciplineName}</div>
                            </div>
                        </div>
                    </div>
                    <div className="vedomost-list_search">
                        <div className="vedomost-list_search_label">Поиск по группе</div>
                        <div className="vedomost-list_search_group">
                        <Select
                            showSearch
                            placeholder="Выберите учебную группу"
                            value={group}
                            onChange={handleClickGroup}
                            optionFilterProp="children"
                            className="vedomost-list_search_filter"
                            notFoundContent="Информация не найдена"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            {groups.map((item, index) => (
                                <Option key={index} value={item}>
                                    {item}
                                </Option>
                            ))}
                        </Select>
                        <button className="vedomost-list_search_button" onClick={removeFilter}>Сбросить</button>
                        </div>
                    </div>
                    <table className="vedomost-list_table">
                        <thead className="vedomost-list_table_info">
                        <tr>
                            <th className="vedomost-list_table_id">Номер ведомости</th>
                            <th className="vedomost-list_table_date">Дата</th>
                            <th className="vedomost-list_table_semester">Семестр</th>
                            <th className="vedomost-list_table_group">Группа</th>
                            <th className="vedomost-list_table_type">Вид контроля</th>
                            <th className="vedomost-list_table_discipline">Статус</th>
                            <th className="vedomost-list_table_button"/>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredVedomosti.map((item, index) => (
                            <VedomostLine key={index} date={item.vedomostDate}
                                          vedomostId={item.vedomostId} status={item.status}
                                          typeOfControl={item.typeOfControl} group={item.groupName}
                                          semester={item.semesterName}
                                          handleClick={() => handleClick(item.vedomostId)}/>
                        ))}
                        </tbody>
                    </table>
                </div>}
        </div>
    );
}


export default Vedomost;