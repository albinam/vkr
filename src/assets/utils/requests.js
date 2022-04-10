import axios from "axios";
import {setDisciplines, setFiltered, setGrades, setVedomost, setVedomosti, setYears} from "../../redux/actions/actions";
import {errorCatch} from "./error";

const token = "admin:dP7yEO";
let encodedAuth = btoa(token);

const myAxios = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedAuth}`,
        'Access-Control-Allow-Origin': '*'
    },
});

export const getYears = () => {
    return (dispatch) => {
        myAxios.get('/getYears')
            .then((resp) => {
                dispatch(setYears(resp.data));
            })
            .catch(function (error) {
                    errorCatch(error);
                }
            )
    }
}

export const getDisciplines = (yearId, teacherId) => {
    return (dispatch) => {
        myAxios.get(`/getDisciplines/${teacherId}&${yearId}`)
            .then((resp) => {
                dispatch(setDisciplines(resp.data));
            })
            .catch(function (error) {
                    errorCatch(error);
                }
            )
    }
}
export const getVedomosti = (yearId, teacherId, disciplineId) => {
    return (dispatch) => {
        myAxios.get(`/getVedomosti/${teacherId}&${yearId}&${disciplineId}`)
            .then((resp) => {
                dispatch(setVedomosti(resp.data));
                dispatch(setFiltered(resp.data));
            })
            .catch(function (error) {
                    errorCatch(error);
                }
            )
    }
}
export const getVedomost = (vedosmostId) => {
    return (dispatch) => {
        myAxios.get(`/getVedomost/${vedosmostId}`)
            .then((resp) => {
                dispatch(setVedomost(resp.data));
            })
            .catch(function (error) {
                    errorCatch(error);
                }
            )
    }
}
export const getGrades = (gradesSystemId) => {
    return (dispatch) => {
        myAxios.get(`/getGrades/${gradesSystemId}`)
            .then((resp) => {
                dispatch(setGrades(resp.data));
            })
            .catch(function (error) {
                    errorCatch(error);
                }
            )
    }
}

export const downloadVed = (vedomostId) => {
    myAxios({
        url:
            `/vedomostToPdf/${vedomostId}`,
        method: "GET",
        responseType: "blob"
    })
        .then((resp) => {
            const url = window.URL.createObjectURL(new Blob([resp.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Ведомость ${vedomostId}.pdf`);
            document.body.appendChild(link);
            link.click();
        })
        .catch(function (error) {
                errorCatch(error);
            }
        )
}


export const postVedomost = (vedomost, vedomostId) => {
    return myAxios.post(`/postVedomost/${vedomostId}`, vedomost).then(() => {
        return true;
    })
        .catch(function (error) {
                errorCatch(error);
            }
        )
}