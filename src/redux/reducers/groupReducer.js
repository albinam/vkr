const initialState = {
    group:null,
    groups: []
}
export default function groupReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_GROUP':
            return {
                ...state,
                group:action.payload
            };
        case 'SET_GROUPS':
            return {
                ...state,
                groups:action.payload
            };
        default:
            return state;
    }
}