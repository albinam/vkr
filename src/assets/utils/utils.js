import axios from "axios";
import {setDisciplines, setVedomost, setVedomosti, setYears} from "../../redux/actions/actions";

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
                dispatch(setYears(resp.data.yearsList));
            })
            .catch(function (error) {
                    if (error.response) {
                        // Request made and server responded
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                }
            )
    }
}
export const getDisciplines = (yearId,teacherId) => {
    return (dispatch) => {
        myAxios.get(`/GetDisciplines?teacherId=${teacherId}&yearId=${yearId}`)
            .then((resp) => {
                dispatch(setDisciplines(resp.data.disciplinesList));
            })
            .catch(function (error) {
                    if (error.response) {
                        // Request made and server responded
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                }
            )
    }
}
export const getVedomosti = (yearId,teacherId,disciplineId) => {
    return (dispatch) => {
        myAxios.get(`/GetVedomosti?teacherId=${teacherId}&yearId=${yearId}&disciplineId=${disciplineId}`)
            .then((resp) => {
                dispatch(setVedomosti(resp.data.vedomostList));
            })
            .catch(function (error) {
                    if (error.response) {
                        // Request made and server responded
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                }
            )
    }
}
export const getVedomost = (vedosmostId) => {
    return (dispatch) => {
        myAxios.get(`/GetVedomost?vedomostId=${vedosmostId}`)
            .then((resp) => {
                console.log(resp)
                dispatch(setVedomost(resp.data.vedomost));
            })
            .catch(function (error) {
                    if (error.response) {
                        // Request made and server responded
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                }
            )
    }
}