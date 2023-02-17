import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRaces, searchRaces } from "../actions";

export default function SearchBar () {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    // const [temperamento, setTemperamento] = useState();


// LA LOGICA EN ESTE CASO ESTA HECHA EN EL BACK END - (SEARCH BY NAME)

    function handleSubmit (e) {
        e.preventDefault(); // evita que se renderize la pag una vez enviado el submit 
        dispatch(searchRaces(search));
        setSearch('')
    }   
    function handleClick (e) {
        dispatch(fetchRaces())

    }

    return (
        // Formulario Controlado: Que los elementos del formulario esten gestionados por el estado del componente
        <div > 
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="Search..." onChange={(e)=> {setSearch(e.target.value)}} value={search}></input>
                <input type='submit' value='Search'></input>
            </form>
            <button onClick={handleClick}>Clean</button>
        </div>
    )
}


