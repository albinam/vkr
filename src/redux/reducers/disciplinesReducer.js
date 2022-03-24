const initialState = {
    disciplines:[],
    discipline:{
        id:null,
        name:null
    }
}
export default function disciplinesReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_DISCIPLINES':
            return {
                ...state,
                disciplines: action.payload
            };
        case 'SET_DISCIPLINE':
            return {
                ...state,
                discipline:action.payload
            };
        default:
            return state;
    }
}