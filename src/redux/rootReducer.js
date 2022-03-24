import { combineReducers } from "redux";
import disciplinesReducer from "./reducers/disciplinesReducer";
import vedomostReducer from "./reducers/vedomostReducer";
import yearsReducer from "./reducers/yearsReducer";
import teacherReducer from "./reducers/teacherReducer";

const rootReducer = combineReducers({
    disciplines: disciplinesReducer,
    vedomost: vedomostReducer,
    years:yearsReducer,
    teacher:teacherReducer
});

export default rootReducer;