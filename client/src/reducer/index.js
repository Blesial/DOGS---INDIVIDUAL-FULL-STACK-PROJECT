import { FETCH_RACE, ORDER_RACE, FILTER_RACE } from "../actions/types";
import axios from "axios";

const initialState = {
    races: [],
    race: {}
};

export default function rootReducer (state = initialState, action){ // es un destructuring de ACTION 
    switch (action.type) {
        case FETCH_RACE:
            return {
                ...state,
                races: action.payload
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
        
        // case ORDER_RACE:
        // const orderAscendente = state.allCharacters.sort((a, b) => {
          
        //     if (payload === 'Ascendente') {  return a.id - b.id }
        //     else {
        //        return  b.id - a.id
        //     }
        // });
           
        //   return {
        //         ...state,
        //         myFavorites: orderAscendente

        //     }
        // default:
        //     return {
        //         ...state
        //     }