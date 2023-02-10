import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRaces, searchRaces } from "../actions";

export default function SearchBar () {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    // const [temperamento, setTemperamento] = useState();

    // si queremos tener un solo estado que tenga dentro todos los datos de todos los formularios que quieras:
    // 1- inicializar el use state ({}) con objeto vacio.
    // 2- dsp hacer un onChange de la sig forma: Y LISTO.
    // const onChange = (e) => {
    //  setSearch({
    //     ...search,
    //      [e.target.name]: e.target.value
   // })
    //})

    function handleSubmit (e) {
        e.preventDefault(); // evita que se renderize la pag una vez enviado el submit 
        dispatch(searchRaces(search));
    }   
    function handleClick (e) {
        dispatch(fetchRaces())
    }

    return (
        // Formulario Controlado: Que los elementos del formulario esten gestionados por el estado del componente
        <div> 
            <form onSubmit={handleSubmit}>
                {/* <label htmlFor="nombre">Race: </label> */}
                <input type='text' onChange={(e)=> {setSearch(e.target.value)}} value={search}></input>
                <input type='submit' value='Search'></input>
            </form>
            <button onClick={handleClick}>Clean</button>
        </div>
    )
}


