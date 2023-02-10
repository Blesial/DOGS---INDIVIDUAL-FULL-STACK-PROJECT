import { FETCH_RACE, ORDER_RACE, SEARCH_RACE } from "../actions/types";

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
                race: action.payload // ACA RACE 
            }
        case ORDER_RACE:
            let orderedRaces = [...state.races]
        orderedRaces = orderedRaces.sort((a, b) => {
            if (a.name < b.name) {
                return action.payload === 'Ascending' ? -1 : 1;
            }
            if (a.name > b.name) {
                return action.payload === 'Ascending' ? 1 : -1;
            }
            return 0;
        });
        console.log(orderedRaces)

        return {
                ...state,
                race: orderedRaces
            }
        default: 
            return state
    }
}

// case 'ORDER':
//     const orderAscendente = state.allCharacters.sort((a, b) => {
      
//         if (payload === 'Ascendente') {  return a.id - b.id }
//         else {
//            return  b.id - a.id
//         }
//     });
       
//       return {
//             ...state,
//             myFavorites: orderAscendente

//         }


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