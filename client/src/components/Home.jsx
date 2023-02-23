
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { fetchRaces, filterByTemperaments, getTemperaments, orderWeight } from "../actions";
import Race from "./race";
import {Link} from 'react-router-dom'
import Paginado from "./paginado";
import { filterRacesByOrigin } from "../actions";
import { orderRace } from "../actions";
import dog from '/Users/blesial/Desktop/PI-Dogs-main/client/src/dog.png'
import styles from './Home.module.css';
import SearchBar from "./searchBar";


export default function Home () {
   const dispatch = useDispatch()
   const store = useSelector(state => state)
   const [order, setOrder] = useState();

//PAGINADO:
   const [currentPage, setCurrentPage] = useState(1);
   const [racePerPage, setRacePerPage] = useState(8);

   const indexOfLastRace = currentPage * racePerPage; //[8] (recorda que el metodo slice incluye el "desde" pero no el "hasta")
   const indexOfFirstRace = indexOfLastRace - racePerPage;
   const currentRaces = store.races.slice(indexOfFirstRace, indexOfLastRace
      )

   const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
   }

   useEffect(()=>{ // corre cuando el componente se monta, o cuando cambia algun estado/variable que se indique en el array de dependencias. 
      dispatch(fetchRaces())
      dispatch(getTemperaments())
 
   }, [dispatch]); // ver si genera problemas meter el dispatch ahi . soluciona un error que me tira react 
   // se lo llama array de dependencias. Si no ponemos el array de dependencias se monta y renderiza en loop 

   function handleFilterByOrigin (e) {
      dispatch(filterRacesByOrigin(e.target.value))
   }

   const handleSort = (e) => {
      dispatch(orderRace(order));
      setCurrentPage(1);
      setOrder(e.target.value); // esto es para que vuelva a renderizar el componente. sino no funcionaria el set current page
  }

  const handleWeight = (e) => {
      dispatch(orderWeight(e.target.value))
      setCurrentPage(1);
      setOrder(e.target.value)

  }

  const handleFilterByTemp = (e) => {
      dispatch(filterByTemperaments(e.target.value))
      setCurrentPage(1);
      setOrder(e.target.value)
  }

   return (
      <div>
         <SearchBar/>
                 <div>
                 <button className={styles.button}><Link style={{
                padding: '0 10px',
                textDecoration:'None',
                color: 'white',
            }} to='/add'>Create Race</Link></button>
 <p>Select Order :</p>
<label 
htmlFor="Ascending"
>
    Ascending
</label>
<input
type='radio'
id="Ascending"
value='Ascending'
name='order'
onChange={handleSort}

/>

<label 
htmlFor="Descending"
>
    Descending
</label>
<input
type='radio'
id="Descending"
value='Descending'
name='order'
defaultChecked
onChange={handleSort}
/>

<label htmlFor="Weight" >
    Weight
</label>
<input onChange={handleWeight}
type='radio'
id="Weight"
value='Weight'
name="order"
/>
        </div>
         <br></br>
            <select onChange={handleFilterByOrigin} >
            <option value='all'>All Races</option>
            <option value='api'>Api Races</option>
            <option value='db'>Own Races</option>
            </select> 
            
            <select onChange={handleFilterByTemp}>        
            {store.temperaments.map(e => {
               return (
                  <option value={e.name}>{e.name}</option>
               )
            })}
            </select>
         <div>
      <br></br>
      <Paginado  racePerPage={racePerPage}
                  racesStore={store.races.length}
                  paginado={paginado}
         />
         </div>
         <div className={styles.body}>
         { 
         currentRaces.map((race) => {
         return (
            
            <div className={styles.container}>
               <Link to={'/home/' + race.id}>
            <Race key={race.id} name={race.name} image={race.image ? race.image : <img alt='Wof' src={dog}/>} temperaments={race.temperaments} weight={race.weight}/>
            </Link>
            </div>
         ) 
         })}
         </div>
      </div> 
   )
}
