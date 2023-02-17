import React from "react";
import styles from './paginado.module.css';

export default function Paginado ({racePerPage, racesStore, paginado}) {
    const pagesNumber = [];
    
    for (let i = 1; i <= Math.ceil(racesStore/racePerPage); i++) {
        pagesNumber.push(i);
    }

    return (
        <nav>
           
                {pagesNumber && 
                pagesNumber.map(number => (
                    <span key={number}>
                         <button className={styles.button_top} onClick={()=> paginado(number)}>{number}</button>
           
                         </span>)
                )}
      
        </nav>
    )
}