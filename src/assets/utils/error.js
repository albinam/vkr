import {message} from "antd";

const errorMessage = (text) => {
    message.error(text);
};

export const errorCatch = (error) => {
    if (error.response) {
        errorMessage("Данные не найдены")
    } else if (error.request) {
        errorMessage("Ошибка сервера")
    } else {
        errorMessage("Что-то пошло не так")
    }
}

export const success = () => {
    message.success("Данные успешно сохранены");
}