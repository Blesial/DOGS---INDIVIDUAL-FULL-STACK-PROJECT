import { FETCH_RACE, ORDER_RACE, FILTER_RACE, SEARCH_RACE } from "../actions/types";

const initialState = {
    races: [],
    race: []
};

export default function rootReducer (state = initialState, action){ // es un destructuring de ACTION 
    switch (action.type) {
        case FETCH_RACE:
            return {
                ...state,
                race: [], // esto es para cuando toquemos el boton del searchbar 'clean'. limpie el estado del search_race y renderize nuevamente todas las razas
                races: action.payload
            }
        case SEARCH_RACE:
            return {
                ...state,
                race: action.payload
            }
        case ORDER_RACE:
         const orderAscendente = state.races.sort((a, b) => {
            if (action.payload === 'Ascending') {  return a.id - b.id }
        else {
             return  b.id - a.id
         }
        });
        return {
                ...state,
                races: orderAscendente
            }
        default: 
            return state
    }
}


        // case ADD_RACE:
        //     return {
        //         ...state,
        //         myFavorites: [...state.allCharacters, payload],
        //         allCharacters: [...state.allCharacters, payload]
                
        //     }

                // case FILTER_RACE:
        // const filteredChar = state.allCharacters.filter(e => e.gender === payload)
        //     return {
        //         ...state,
        //         myFavorites: filteredChar
        //     }
        

        // default:
        //     return {
        //         ...state
        //     }