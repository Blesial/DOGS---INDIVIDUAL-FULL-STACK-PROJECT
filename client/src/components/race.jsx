import React from "react";
import styles from './race.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {deleteFav, addFav} from '../actions/index'
import {Link} from 'react-router-dom';
import heart from '../assets/corazon.svg';

export default function Race (props) {

  const dispatch = useDispatch();
  const {id} = props;

  const { fav } = useSelector(state => state);


  const handleFav = (data) => {
    const included = fav.find(dog => dog.id === id);
    included ? dispatch(deleteFav(data))
    : dispatch(addFav(data));
};
const active = fav.find((dogfav) => dogfav.id === id);

console.log(fav)
    return (
      
        <div className={styles.container}>
        <div className={styles.card}>
        <Link to={`/home/${id}`}>
          <img className={styles.img} alt="Dog" src={props.image}/>
          </Link>
          <div className={styles.intro}>
          <h1 className={styles.h1}>{props.name}<br></br> Weight: {props.weight} Kg</h1>
          <p className={styles.p}><span>Temperaments: {`${props.temperaments?.length > 1 ? props.temperaments + ', ' : props.temperaments}`}</span></p>
          <button
                    onClick={() => handleFav(props)}
                    className={active ? styles.favActive : styles.fav}
                >
                <img src={heart}></img>
                </button>
          </div>
          </div>
        </div>
    )
}




