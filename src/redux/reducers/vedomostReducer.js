const initialState = {
    vedomosti:[],
    vedomost:null,
    grades:[],
    filteredVedomosti:[]
}
export default function vedomostReducer(state = initialState, action) {
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
        case 'SET_GRADES':
            return {
                ...state,
                grades:action.payload
            };
        case 'SET_FILTERED':
            return {
                ...state,
                filteredVedomosti:action.payload
            };
        default:
            return state;
    }
}