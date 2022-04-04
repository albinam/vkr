import axios from "axios";
import {setDisciplines, setFiltered, setGrades, setVedomost, setVedomosti, setYears} from "../../redux/actions/actions";
import {errorCatch} from "./error";

const token = "Администратор:123";

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}

let encodedAuth = b64EncodeUnicode(token);

const myAxios = axios.create({
    baseURL: 'http://localhost/vkr/hs/Ulstu_Vedomosti/v1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedAuth}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'origin, content-type, authorization',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials': true
    },
});

export const getYears = () => {
    return (dispatch) => {
        myAxios.get('/GetYears')
            .then((resp) => {
                const years = [];
                var date = new Date;
                resp.data.yearsList.map(item => {
                    let arr = item.name.split(' - ');
                    if ((parseInt(arr[1]) - parseInt(arr[0])) === 1 && (parseInt(arr[1]) <= date.getFullYear())) {
                        years.push(item);
                    }
                })
                dispatch(setYears(years));
            })
            .catch(function (error) {
                    errorCatch(error);
                }
            )
    }
}

export const getDisciplines = (yearId, teacherId) => {
    return (dispatch) => {
        myAxios.get(`/GetDisciplines?teacherId=${teacherId}&yearId=${yearId}`)
            .then((resp) => {
                dispatch(setDisciplines(resp.data.disciplinesList));
            })
            .catch(function (error) {
                    errorCatch(error);
                }
            )
    }
}
export const getVedomosti = (yearId, teacherId, disciplineId) => {
    return (dispatch) => {
        myAxios.get(`/GetVedomosti?teacherId=${teacherId}&yearId=${yearId}&disciplineId=${disciplineId}`)
            .then((resp) => {
                dispatch(setVedomosti(resp.data.vedomostList));
                dispatch(setFiltered(resp.data.vedomostList));
            })
            .catch(function (error) {
                    errorCatch(error);
                }
            )
    }
}
export const getVedomost = (vedosmostId) => {
    return (dispatch) => {
        myAxios.get(`/GetVedomost?vedomostId=${vedosmostId}`)
            .then((resp) => {
                dispatch(setVedomost(resp.data.vedomost[0]));
            })
            .catch(function (error) {
                    errorCatch(error);
                }
            )
    }
}
export const getGrades = (gradesSystemId) => {
    return (dispatch) => {
        myAxios.get(`/GetGrades?gradesSystemId=${gradesSystemId}`)
            .then((resp) => {
                dispatch(setGrades(resp.data.gradesList));
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
            `/VedomostToPdf?vedomostId=${vedomostId}`,
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
    return myAxios.post(`/PostVedomost?vedomostId=${vedomostId}`, vedomost).then(() => {
        return true;
    })
        .catch(function (error) {
                errorCatch(error);
            }
        )
}