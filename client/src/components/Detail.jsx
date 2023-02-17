import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterRaces } from "../actions";

export default function Detail () {
const dispatch = useDispatch();
const id = useParams();
console.log(id.id)
useEffect(() => { 
  dispatch(filterRaces(id.id));
       
}, [dispatch]);

const race = useSelector(store => store.detail) // ver como llega la info a detail (state)
// race.temperaments = race.temperaments.map(temp => temp);
console.log(race)
return (
   <div> 
      
       <Link to='/home'><button>Return Home</button></Link>
     {race.length > 0 ?
      <div>
        <img src={race[0].image? race[0].image : 'https://i.pinimg.com/736x/99/b9/8d/99b98dc7b18311a1b464602342a245e8.jpg'}></img>
        <h1>Name: {race[0].name}</h1>
        <h2>Height: {race[0].height}</h2>
        <h2>Weight: {race[0].weight}</h2>
        <h2>Life Span: {race[0].age}</h2>
        <h2>Temperaments: {race[0].temperaments}</h2>
        </div>
      :     <div>
      <img src='https://i.pinimg.com/736x/99/b9/8d/99b98dc7b18311a1b464602342a245e8.jpg' alt="Wof!"></img>
      <h1>Name: {race.name}</h1>
      <h2>Height: {race.height}</h2>
      <h2>Weight: {race.weight}</h2>
      <h2>Life Span: {race.age}</h2>
      <h2>Temperaments: {race.temperaments}</h2>
      </div>}
   </div>
        )
}