import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function () {

const [race, setRace] = useState();
let {id} = useParams();

useEffect(() => {
    axios.get(`http://localhost:3001/api/dogs/${id}`)
        .then((response) => {
            setRace(response.data)
        })

        return () => {
            setRace(null)
        } // clean up si trabaja con redux 
}, [])

return (
    <div> 
        { race ? 
            <>
            <h3>{race.name}</h3>
            <img src={race.image} alt='Dog'></img>
            </> : 
            <div>Loading</div>
        }
    </div>
)
}