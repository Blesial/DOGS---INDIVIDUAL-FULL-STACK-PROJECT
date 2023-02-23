import {FETCH_RACE, FILTER_BY_ORIGIN, GET_TEMPERAMENTS, ORDER_RACE, ORDER_WEIGHT, SEARCH_RACE, POST_RACE, FILTER_RACE, FILTER_BY_TEMPERAMENTS} from './types';
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
    dispatch({
      type: SEARCH_RACE,
      payload: race.data
    })
  } catch (error) {
    console.log(error)
  }
}

export function orderRace (order) {
  return {
    type: ORDER_RACE,
    payload: order
  }
}
export function orderWeight (order) {
  return {
    type: ORDER_WEIGHT,
    payload: order
  }
}

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

export function filterRacesByOrigin (payload) {
  return {
    type: FILTER_BY_ORIGIN,
    payload
  }
}

export function filterByTemperaments (payload) {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload
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

// export const postCreateDog = (payload) => {
//   return async (dispatch) => {
//       const res = await axios.post('http://localhost:3004/dogs',payload);
//       console.log(res);
//       return res;
//     }
// };
