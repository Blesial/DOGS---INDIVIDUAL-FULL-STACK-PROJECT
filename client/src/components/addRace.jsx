import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";


export default function AddRace () {
    const [race, setRace] = useState({});
    const history = useHistory();

    function handleChange (e) {
        e.preventDefault();
        setRace({
            ...race,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit (e) {
        e.preventDefault()
        axios.post('/http://localhost:3001/api/dogs', {race})
        .then(()=> {
            history.push('/')
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nombre: </label>
            <input onChange={handleChange} name="name" type='text' value={race.name}/>
            <br>
            </br>

            <label htmlFor="image">Imagen: </label>
            <input onChange={handleChange} name="image" type='text' value={race.image}/>

            <br>
            </br>
            <label htmlFor="weight">Peso: </label>
            <input onChange={handleChange} name="weight" type='text' value={race.weigth}/>
            <br>
            </br>
            <label htmlFor="temperament">Temperamento: </label>
            <input onChange={handleChange} name="temperament" type='text' value={race.temperament}/>
            <br>
            </br>
            <input type='submit'/>
        </form>
    ) 
}