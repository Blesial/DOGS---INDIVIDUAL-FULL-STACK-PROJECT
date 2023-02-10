import React from "react";


export default function Race (props) {

  console.log(props)
    return (
        <div>
          <img alt="Dog" src={props.image}/>
          <h1>{props.name}</h1>
          <h2>Temperaments: {props.temperaments}</h2>
          <h3>Weight: {props.weight}</h3>
          <br/>
        </div>
    )
}