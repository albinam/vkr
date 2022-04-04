import { combineReducers } from "redux";
import disciplinesReducer from "./reducers/disciplinesReducer";
import vedomostReducer from "./reducers/vedomostReducer";
import yearsReducer from "./reducers/yearsReducer";
import teacherReducer from "./reducers/teacherReducer";
import groupReducer from "./reducers/groupReducer";

const rootReducer = combineReducers({
    disciplines: disciplinesReducer,
    vedomost: vedomostReducer,
    years:yearsReducer,
    teacher:teacherReducer,
    group:groupReducer
});

export default rootReducer;