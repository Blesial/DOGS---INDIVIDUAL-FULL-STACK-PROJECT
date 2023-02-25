import { FETCH_RACE, FILTER_BY, FILTER_BY_ORIGIN, GET_TEMPERAMENTS, ORDER_RACE, POST_RACE, FILTER_RACE, SEARCH_RACE, ORDER_WEIGHT, FILTER_BY_TEMPERAMENTS, DOGS_BY_NAME_MESSAGE_ERROR} from "../actions/types";

const initialState = {
    races: [],
    allRacesFixed: [],
    temperaments: [],
    detail: [],
    errorMessage: ''
};

export default function rootReducer (state = initialState, action){
    switch (action.type) {
        case FETCH_RACE:
            return {
                ...state, // siempre se hace esto PORQUE HAY Q CREAR UNA COPIA DEL ESTADO ANTERIOR Y MODIFICAR ESA COPIA. NUNCA SE MODIFICA EL ESTADO ANTERIOR. SIEMPRE ES ALGO NUEVO LO Q SE TIENE QUE CARGAR EN EL ESTADO. SE PISAN LOS ESTADOS
                races: action.payload,
                allRacesFixed: action.payload // hardcodear razas 
            }
        case SEARCH_RACE:
            return {
                ...state,
                races: action.payload,
                errorMessage: ''
            }       
            case DOGS_BY_NAME_MESSAGE_ERROR:
      return {
        ...state,
        errorMessage: 'Race not found',
        races: [],
      }
        case FILTER_BY: // ACA VOY A JUNTAR TODO 
            return {
                ...state,
               races: action.payload
            }
   
            case FILTER_RACE: // DETAIL

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
