const initialState = {
    vedomosti:[],
    vedomost:null
}
export default function yearsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_VEDOMOSTI':
            return {
                ...state,
                vedomosti: action.payload
            };
        case 'SET_VEDOMOST':
            return {
                ...state,
                vedomost:action.payload
            };
        default:
            return state;
    }
}