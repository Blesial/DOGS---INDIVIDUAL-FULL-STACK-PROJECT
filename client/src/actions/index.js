import {FETCH_RACE, ORDER_RACE, FILTER_RACE, SEARCH_RACE} from './types';
import axios from 'axios';
// ACTIONS CREATORS
// Aca estamos utilizando redux thunk. Por eso usamos el dispatch dentro de la action creator.
// Necesitamos hacer uso de este middleware ya que nuestras peticiones al back siempre son asincrónicas,
// por lo tanto, necesitamos ese "delay" para despachar nuestra action hasta que la data nos llegue.
export const fetchRaces = () => async (dispatch) => {
  try {
    const race = await axios.get('http://localhost:3001/api/dogs?limit=10&page=0')
    dispatch({
      type: FETCH_RACE,
      payload: race.data
    })
  } catch (error) {
    console.log(error)
  }
}

// IMPORTANTE!!! :
// An action creator that returns a function to perform conditional dispatch:

// function incrementIfOdd() {
//   return (dispatch, getState) => {
//     const { counter } = getState()

//     if (counter % 2 === 0) {
//       return
//     }

//     dispatch(increment())
//   }
// }
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

export function orderRace (id) {
  return {
    type: ORDER_RACE,
    payload: id
  }
}

export function filterRaces (id) {

}

// These are the normal action creators you have seen so far.
// The actions they return can be dispatched without any middleware.
// However, they only express “facts” and not the “async flow”.
