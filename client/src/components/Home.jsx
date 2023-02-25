
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { fetchRaces, getFilterBy, getTemperaments } from "../actions";
import Race from "./race";
import {Link} from 'react-router-dom';
import Paginado from "./paginado";
import dog from '/Users/blesial/Desktop/PI-Dogs-main/client/src/dog.png'
import styles from './Home.module.css';
import SearchBar from "./searchBar";
import NotFound from './NotFound';


export default function Home () {
   const dispatch = useDispatch()
   const store = useSelector(state => state)

      const [filter, setFilter] = useState({
     temperament: "All",
     origin: "all",
     order: "Ascending",
   });

//PAGINADO:
   const [currentPage, setCurrentPage] = useState(1);
   const [racePerPage, setRacePerPage] = useState(8);

   const indexOfLastRace = currentPage * racePerPage; //[8] (recorda que el metodo slice incluye el "desde" pero no el "hasta")
   const indexOfFirstRace = indexOfLastRace - racePerPage;
   const currentRaces = store.races.slice(indexOfFirstRace, indexOfLastRace);

   const paginado = (pageNumber) => {
      setCurrentPage(pageNumber)
   }

   useEffect(()=>{ // corre cuando el componente se monta, o cuando cambia algun estado/variable que se indique en el array de dependencias. 
      dispatch(fetchRaces())
      dispatch(getTemperaments())
 
   }, [dispatch]); // ver si genera problemas meter el dispatch ahi . soluciona un error que me tira react 
   // se lo llama array de dependencias. Si no ponemos el array de dependencias se monta y renderiza en loop 


   function handleFilters (e) {
      setFilter({
         ...filter,
         [e.target.name]: e.target.value
      })
   }

   const handleSubmit = (e) => {

            e.preventDefault();
           dispatch(getFilterBy(filter));
           setCurrentPage(1);
           setFilter({
             temperament: "All",
             origin: "all",
             order: "Ascending",
           });
         };


   return (
      <>

      <div>
        <SearchBar/>
               
               <button className={styles.button}><Link style={{
              padding: '0 10px',
              textDecoration:'None',
              color: 'white',
          }} to='/add'>Create Race</Link></button>
      </div>
        <div className={styles.acomoda}>
      <form type="submit" onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.order}>
        <label htmlFor="order">
          <span>Order: </span>
        </label>
       <select
         className={styles.input}
         id="order"
         name="order"
         value={filter.order}
         onChange={handleFilters}
       >
         <option value="Ascending">Name (A - Z)</option>
         <option value="Descending">Name (Z - A)</option>
         <option value="Weight">Weight (Min - Max)</option>
       </select>
     </div>
              <div className={styles.origin}>
             <label htmlFor="origin">
             <span>Origin: </span>
            </label>
           <select
         className={styles.input}
         id="origin"
         name="origin"
         value={filter.origin}
         onChange={handleFilters}
       >
         <option value="all">All</option>
         <option value="api">Api</option>
         <option value="db">Data base</option>
       </select>
     </div>


     <div className={styles.temperament}>
          <label htmlFor="temperament">
            <span>Temperament: </span>
          </label>
          <select
         className={styles.input}
         id="temperament"
         name="temperament"
         value={filter.temperament}
         onChange={handleFilters}
       >
         <option value="All">All</option>
         {store.temperaments.map((temperament) => (
           <option key={temperament.id} value={temperament.name}>
             {temperament.name}
           </option>
         ))}
       </select>
     </div>
     <button className={styles.search} type="submit" onClick={handleSubmit}>
      GO!        </button>
     </form>
     </div>

     <div>
    <Paginado  racePerPage={racePerPage}
                racesStore={store.races.length}
                paginado={paginado}
       />
       </div>
       <div className={styles.body}>
       { 
       store.errorMessage ? <div className={styles.notfound}><NotFound/></div>
       :
       currentRaces.map((race) => {
       return (
          
          <div className={styles.container}>
             <Link to={`/home/${race.id}`}>
          <Race key={race.id} name={race.name} image={race.image ? race.image : <img alt='Wof' src={dog}/>} temperaments={race.temperaments} weight={race.weight}/>
          </Link>
          </div>
       ) 
       })}
       </div>
     </>
   )
}



