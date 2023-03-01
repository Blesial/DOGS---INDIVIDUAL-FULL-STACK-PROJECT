import React from 'react'
import Footer from './Footer'
import { useSelector, useDispatch } from "react-redux";
import {Link} from 'react-router-dom';
import { filterRaces, deleteFav } from "../actions";
import styles from './Favorites.module.css'
function Favorites() {
    const { fav } = useSelector((state) => state);
    const dispatch = useDispatch();

    let favId = fav?.map((dogfav) => { // me traigo todos los id's del estado 
        return dogfav.id;
    })


    const handleDeleteFav = (data) => {
        dispatch(deleteFav(data));
    }
    const active = fav.find((dogfav) => dogfav.id === favId);

    return (
        <div className={styles.all}>
                <div className={styles.favContainer}>
                    {
                        fav.length ? (
                            fav.map((dogfav) => {
                                return (
                                    <div className ={styles.card}>
                                    <div className={styles.card_container}>
                                        <div className={styles.name}>
                                            <h1>{dogfav.name}</h1>

                                        </div>
                                        <Link to={`/home/${dogfav.id}`}>
                                            <img src={dogfav.image} alt={dogfav.name} className={styles.image} onClick={() => dispatch(filterRaces(dogfav.id))}/> {/* Envio el id al reducer para crear la seccion de Description */}
                                        </Link>
                                        <div className={styles.container__info}>
                                        </div>
                                        <div className={styles.temperament}>
                                            {
                                                dogfav.temperaments.split(",").map((temps, index) => { // recorro el array de temperamentos, index es el indice del array
                                                    if( index < 5 ) {
                                                        return <p key={index}>{temps}</p> //solo muestro 6 temperamentos
                                                    } else {
                                                        return
                                                    }
                                                })
                                            }
                                        </div>
                                        <button 
                                            onClick={() => handleDeleteFav(dogfav)}
                                            className={active ? styles.fav :styles.favActive}
                                        >
                                        +
                                        </button>
                                    </div>
                                </div>
                                )}
                            )
                        ) : (
                            <div className={styles.favError}>
                                <h2>No dogs added to favorites have been found</h2>
                                <p>Go home and add a dog to favorites</p>
                                <Link to="/home">
                                    <button className={styles.notFound404_button}>Home</button>
                                </Link>
                            </div>
                        )
                    }
                </div>
            <Footer/>
        </div>
    )
}

export default Favorites