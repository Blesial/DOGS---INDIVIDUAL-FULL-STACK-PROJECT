import { FETCH_RACE, DELETE_DOG, FILTER_BY, GET_TEMPERAMENTS, POST_RACE, FILTER_RACE, SEARCH_RACE, DOGS_BY_NAME_MESSAGE_ERROR, DELETE_FAV, ADD_FAV} from "../actions/types";

const initialState = {
    races: [],
    allRacesFixed: [],
    temperaments: [],
    detail: [],
    errorMessage: '',
    fav: []
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
            case DOGS_BY_NAME_MESSAGE_ERROR: // para que aparezca el componente Not Found
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
            case DELETE_DOG:
                return {
                     ...state 
                    };
            case DELETE_FAV:
                return {
                    ...state,
                    fav: state.fav.filter(dog => dog.id !== action.payload)
                }
            case ADD_FAV:
                return {
                    ...state,
                    fav: [...state.fav, action.payload]
                }
        default: 
            return state
    }
}
