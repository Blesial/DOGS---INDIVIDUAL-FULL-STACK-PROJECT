import {FETCH_RACE, DELETE_DOG, GET_TEMPERAMENTS,FILTER_BY, SEARCH_RACE, POST_RACE, FILTER_RACE, DOGS_BY_NAME_MESSAGE_ERROR, ADD_FAV, DELETE_FAV} from './types';
import axios from 'axios';
// ACTIONS CREATORS
// Aca estamos utilizando redux thunk. Por eso usamos el dispatch dentro de la action creator.
// Necesitamos hacer uso de este middleware ya que nuestras peticiones al back siempre son asincrónicas,
// por lo tanto, necesitamos ese "delay" para despachar nuestra action hasta que la data nos llegue.
export const fetchRaces = () => async (dispatch) => {
  try {
    const race = await axios.get('http://localhost:3001/api/dogs')
    dispatch({
      type: FETCH_RACE,
      payload: race.data
    })
  } catch (error) {
    console.log(error)
  }
}

export const searchRaces = (search) => async (dispatch) => {
  try {
    const race = await axios.get(`http://localhost:3001/api/dogs?name=${search}`)
    race.data.length ?
      dispatch({
        type: SEARCH_RACE,
        payload: race.data
      })
      :
      dispatch({ type: DOGS_BY_NAME_MESSAGE_ERROR });
  
  } catch (error) {
    console.log(error)
  }
}

export const getFilterBy = ({temperament, origin, order}) => {
  return function (dispatch) {
    axios.get('http://localhost:3001/api/dogs').then((response) => {
      let dataFilter = [];

      temperament === "All"
        ? dataFilter = response.data
        : dataFilter = response.data.filter((race) =>
            race.temperaments ? race.temperaments.includes(temperament) : false
          );

      origin === "db"
        ? dataFilter = dataFilter.filter(race => race.createdInDataBase)
        : origin === "all" ? dataFilter = dataFilter : dataFilter = dataFilter.filter(race => !race.createdInDataBase)


      order === "Ascending"
        ? dataFilter = dataFilter.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
          })
        : order === "Descending"
        ? dataFilter = dataFilter.sort((b, a) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
          })
        : order === "Weight"
        ? dataFilter = dataFilter.sort((a, b) => {
            if (a.weightMin > b.weightMin) {
              return 1;
            }
            if (a.weightMin < b.weightMin) {
              return -1;
            }
          })
        : dataFilter = dataFilter;

      dispatch({ type: FILTER_BY, payload: dataFilter });
    });
  };
};


export const filterRaces = (id) => async (dispatch) => {
  try {
    const detailIdRace = await axios.get(`http://localhost:3001/api/dogs/${id}`);
    
    dispatch({
      type: FILTER_RACE,
      payload: detailIdRace.data
    })
  } catch (error)  {
    console.log(error)
  }
}

export const getTemperaments = () => async (dispatch) => {
  try {
    const temperamentsDb = await axios.get('http://localhost:3001/api/temperaments')
    dispatch({
      type: GET_TEMPERAMENTS,
      payload: temperamentsDb.data
    })
  } catch (error) {
    console.log(error)
  }
}

export const postRace = (payload) => async (dispatch) => {
  try {
    const postRace = await axios.post('http://localhost:3001/api/dogs', payload)
    dispatch({
      type: POST_RACE,
      payload: postRace.data
    })
  } catch (error) {
    console.log(error);
  }
}

export const deleteDog = (id) => {
  return async function (dispatch) {
      try {
          await axios.delete(`http://localhost:3001/api/dogs/delete/${id}`);
          return dispatch({
              type: DELETE_DOG,
      });
      } catch (e) {
          console.log(e);
      };
      }
  };

export const deleteFav = (payload) => {

  return {
    type: DELETE_FAV,
    payload: payload.id
  }
}


export const addFav =  (payload) => {
  return {
    type: ADD_FAV,
    payload
  }
}
