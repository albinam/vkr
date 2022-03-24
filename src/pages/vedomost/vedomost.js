import React, {useEffect, useState} from 'react';
import './vedomost.scss';
import {useDispatch, useSelector} from "react-redux";
import {getVedomost} from "../../assets/utils/utils";

function Vedomost() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const vedomost =  useSelector((state) => state.vedomost.vedomost);
    const params = new URLSearchParams(window.location.search);
    useEffect(() => {
        setLoading(true);
        if (!(vedomost)) {
            dispatch(getVedomost(params.get('vedomostId')));

        } else {
            console.log(vedomost)
            setLoading(false)
        }
    });
    return (
        <div>
            {!(loading) ?
                <div className="journal">
                    <div className="journal_info">
                        <div className="journal_info_box">
                            <div className="journal_info_line">Учебная группа:</div>

                        </div>
                        <div className="journal_info_code-label">Код подтверждения</div>
                        <input className="journal_info_code-input" type="text"/>
                        <a href="/">Выслать код подтверждения</a>
                        <button className="journal_info_button">Сохранить</button>
                    </div>
                </div> : <div>vrfvfr</div>}
        </div>
    );
}


export default Vedomost;