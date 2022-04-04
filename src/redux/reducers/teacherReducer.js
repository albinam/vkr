const initialState = {
    teacherId:"000004406"
}
export default function teacherReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TEACHER_ID':
            return {
                ...state,
                teacherId: action.payload
            };
        default:
            return state;
    }
}