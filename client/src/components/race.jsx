import React from "react";
import styles from './race.module.css';


export default function Race (props) {

    return (
      
        <div className={styles.container}>
        <div className={styles.card}>
          <img className={styles.img} alt="Dog" src={props.image}/>
          <div className={styles.intro}>
          <h1 className={styles.h1}>{props.name}<br></br> Weight: {props.weight} Kg</h1>
          <p className={styles.p}><span>Temperaments: {`${props.temperaments?.length > 1 ? props.temperaments + ', ' : props.temperaments}`}</span></p>
          </div>
          </div>
        </div>
    )
}




