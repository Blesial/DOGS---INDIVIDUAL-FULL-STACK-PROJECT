import { FETCH_RACE, FILTER_BY_ORIGIN, GET_TEMPERAMENTS, ORDER_RACE, POST_RACE, FILTER_RACE, SEARCH_RACE, ORDER_WEIGHT, FILTER_BY_TEMPERAMENTS} from "../actions/types";

const initialState = {
    races: [],
    allRacesFixed: [],
    temperaments: [],
    detail: []
};

export default function rootReducer (state = initialState, action){
    switch (action.type) {
        case FETCH_RACE:
            return {
                ...state, // siempre se hace esto PORQUE HAY Q CREAR UNA COPIA DEL ESTADO ANTERIOR Y MODIFICAR ESA COPIA. NUNCA SE MODIFICA EL ESTADO ANTERIOR. SIEMPRE ES ALGO NUEVO LO Q SE TIENE QUE CARGAR EN EL ESTADO. SE PISAN LOS ESTADOS
                races: action.payload,
                allRacesFixed: action.payload
            }
        case SEARCH_RACE:
            return {
                ...state,
                races: action.payload 
            }
        case ORDER_WEIGHT:
            let weightedRaces = state.races
            // weightedRaces = weightedRaces.map(e => e.weight.toString()[0]);
            const orderWeight = weightedRaces.sort((a, b) => {

            return a.weight.toString().split('-')[0].includes('up') ? a.weight.toString().split('-')[0] - b.weight.toString().split('-')[0] : b.weight.toString().split('-')[0] - a.weight.toString().split('-')[0]
            })        
                 return {
                ...state,
                races: orderWeight
            }
        case ORDER_RACE:
            let orderedRaces = state.races
        orderedRaces = orderedRaces.sort((a, b) => {
            if (a.name < b.name) {
                return action.payload === 'Ascending' ? -1 : 1; // va comparando dos valores 
            }
            if (a.name > b.name) {
                return action.payload === 'Ascending' ? 1 : -1;
            }
  
            return 0; // si son iguales que quede como esta 
        });

        return {
                ...state,
                races: orderedRaces
            }
            case FILTER_BY_ORIGIN:
                const allRaces = state.allRacesFixed;
            // dejamos siempre fijo el allraces. y trabajamos sobre el. pero a la hora del return. modificamos el races unicamente
                const raceFilterFrom = action.payload === 'all' ? allRaces : allRaces.filter(e => action.payload === 'db' ? e.createdInDataBase : !e.createdInDataBase)
                    return {
                        ...state,
                        races: raceFilterFrom
                    }
            
            case FILTER_BY_TEMPERAMENTS:
                const all = state.allRacesFixed;
                
                return {
                    ...state,
                     
                }
            case FILTER_RACE:

            return {
                ...state,
                detail: action.payload
            }

            case GET_TEMPERAMENTS: 
                    return {
                        ...state,
                        temperaments: action.payload
                    }
            case POST_RACE:
                return {
                    ...state
                }
        default: 
            return state
    }
}
