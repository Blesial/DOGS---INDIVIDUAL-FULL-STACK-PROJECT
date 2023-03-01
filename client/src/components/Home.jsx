
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { fetchRaces, getFilterBy, getTemperaments } from "../actions";
import Race from "./race";
import Paginado from "./paginado";
import dog from '/Users/blesial/Desktop/PI-Dogs-main/client/src/dog.png'
import styles from './Home.module.css';
 import NotFound from './NotFound';
import Scroll from "./Scroll";
import Footer from "./Footer";
import Nav from "./Nav";


export default function Home () {
   const dispatch = useDispatch(); //para poder usar la action
   const store = useSelector(state => state); // obtengo el estado actual del store 
   const [charge, setCharge] = useState(false); // variable para saber si esta cargando

   const [filter, setFilter] = useState({ // preseteo los valores de busqueda de esta forma. donde no existen filtrados y el orden es en ascendente
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
      setCharge(true);
      setTimeout(() => {
        setCharge(false);
      }, 1500);
    dispatch(fetchRaces())
      dispatch(getTemperaments())
 
   }, [dispatch]); //para que no se ejecute cada vez q se renderiza el componente


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
      <div className={styles.contain}>

      <div>
        <Nav setCurrentPage={setCurrentPage}/>
          <Scroll/>
      </div>
      <div className={styles.title}>
          <h1>PI Dogs</h1>
        </div>
        <div className={styles.acomoda}>
      <form type="submit" onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.box}>
        <label htmlFor="order">
          <span>Order: </span>
        </label>
       <select
         className={styles.select}
         id="order"
         name="order"
         value={filter.order}
         onChange={handleFilters}
       >
         <option className={styles.option}  value="Ascending">Name (A - Z)</option>
         <option className={styles.option} value="Descending">Name (Z - A)</option>
         <option className={styles.option} value="WeightAsc">Weight (Min - Max)</option>
         <option className={styles.option} value="WeightDesc">Weight (Max - Min)</option>
       </select>
     </div>
              <div className={styles.box}>
             <label htmlFor="origin">
             <span>Origin: </span>
            </label>
           <select
         className={styles.select}
         id="origin"
         name="origin"
         value={filter.origin}
         onChange={handleFilters}
       >
         <option className={styles.option} value="all">All</option>
         <option className={styles.option} value="api">Api</option>
         <option className={styles.option} value="db">Data base</option>
       </select>
     </div>


     <div className={styles.box}>
          <label htmlFor="temperament">
            <span>Temperament: </span>
          </label>
          <select
         className={styles.select}
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
          charge ? ( <div> 
<iframe title="FlyingDog"  className={styles.loading} src="https://giphy.com/embed/3o7abAHdYvZdBNnGZq" width="2000" height="600" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p>LOADING...</p>       </div>) 
:

          currentRaces.length ? currentRaces.map((race) => {
            return (
     
              <Race id={race.id} key={race.id} name={race.name} image={race.image ? race.image : <img alt='Wof' src={dog}/>} temperaments={race.temperaments} weight={race.weight}/>
                   )  
            }) :   <div className={styles.notfound}><NotFound/></div>
                                  
                  }
       </div>
       <Footer/>
     </div>
   )
}



