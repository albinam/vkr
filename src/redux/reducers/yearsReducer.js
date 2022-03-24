const initialState = {
    years:[],
    year:null
}
export default function yearsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_YEARS':
            return {
                ...state,
                years: action.payload
            };
        case 'SET_YEAR':
            return {
                ...state,
                year:action.payload
            };
        default:
            return state;
    }
}