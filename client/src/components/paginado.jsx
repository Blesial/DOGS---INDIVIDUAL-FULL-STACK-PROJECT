import React from "react";
import styles from './paginado.module.css';

export default function Paginado ({racePerPage, racesStore, paginado}) {
    const pagesNumber = []; // array guarda los numeros de paginas que van a existir en total. 
    
    for (let i = 1; i <= Math.ceil(racesStore/racePerPage); i++) { // ceil redondea hacia arriba 
        pagesNumber.push(i);
    }

    return (
        <nav className={styles.nav}>
           
                {pagesNumber && 
                pagesNumber.map(number => (
                    <span key={number}>
                         <button className={styles.button_top} onClick={()=> paginado(number)}>{number}</button>
           
                         </span>)
                )}
      
        </nav>
    )
}