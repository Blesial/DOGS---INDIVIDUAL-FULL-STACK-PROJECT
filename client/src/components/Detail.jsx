import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterRaces, deleteDog } from "../actions";
import styles from './Detail.module.css';
import { useNavigate } from "react-router-dom";
import remove2 from '../assets/remove2.png'

export default function Detail () {
const dispatch = useDispatch();
const id = useParams();
const navigate = useNavigate();


useEffect(() => { 
  dispatch(filterRaces(id.id));
       
}, [dispatch, id.id]);

const handleDelete = () => {
  dispatch(deleteDog(id.id));
  alert("Dog deleted succesfully");
  navigate("/home");
};

const race = useSelector(store => store.detail) // ver como llega la info a detail (state)

return (

   <div className={styles.body}> 
      <div className={styles.container}>
     {race.length > 0 ?
     
     <div className={styles.card}>
        <img className={styles.img} src={race[0].image? race[0].image : 'https://i.pinimg.com/736x/99/b9/8d/99b98dc7b18311a1b464602342a245e8.jpg'} alt='Default'></img>
        <br></br>
        <div className={styles.info}>
        <h1>Name: {race[0].name}</h1>
        <h2>Height: {race[0].height}</h2>
        <h2>Weight: {race[0].weight} Kg</h2>
        <h2>Life Span: {race[0].age} </h2>
        <h2>Temperaments: {race[0].temperaments}</h2>
        </div>
        </div>
      :     <div className={styles.card}>
        {
                 (<div>
                    <button className={styles.button_delete} onClick={handleDelete}>
                   <div className={styles.imgg}> <img alt="Heart" src={remove2}></img> </div>
                        </button>
                        </div>
          
                  ) 
                }
      <img className={styles.img} src='https://i.pinimg.com/736x/99/b9/8d/99b98dc7b18311a1b464602342a245e8.jpg' alt="Wof!"></img>
      <div className={styles.info}> 
      <h1>Name: {race.name}</h1>
      <h2>Height: {race.height} Inches from shoulder</h2>
      <h2>Weight: {race.weight} Kg</h2>
      <h2>Life Span: {race.lifeSpan} years</h2>
      <h2>Temperaments: {`${race.temperaments}, `}</h2>
      </div>
      </div>
      }
      </div>
            <Link to='/home'><button className={styles.button_top}>Return Home</button></Link>


   </div>
   
        )
}